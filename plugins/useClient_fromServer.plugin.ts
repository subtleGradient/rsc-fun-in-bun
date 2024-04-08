/// <reference types="bun" />

import { define } from "@/toy-framework/server/polyfillsAndStuff"
import type { Pathname } from "@/toy-framework/server/types"
import { $, Transpiler, type BunPlugin, type JavaScriptLoader } from "bun"
import { registerClientReference } from "react-server-dom-webpack/server.edge"
import { ReactClientManifest } from "./ReactClientManifest.plugin"
export { ReactClientManifest }

const REPO_ROOT = (await $`git rev-parse --show-toplevel`.text()).trim()

export const genPathnameRef = {
  /** replace this with your own implementation */
  current: (relativePath: string, name: string): Pathname => `/!/use-client${relativePath}/${name}.mjs`,
}

function generateClientExport(name: string, absolutePath: Pathname) {
  const relativePath = absolutePath.replace(REPO_ROOT, "").replace(/\\/g, "/")
  const $$id = `${relativePath}#${name}`
  const manifest = (ReactClientManifest[$$id] = { id: relativePath, chunks: [absolutePath], name })
  const proxyImplementation = Object.assign(ClientComponent_onTheServer, { displayName: manifest.name })
  return registerClientReference(proxyImplementation, manifest.id, manifest.name)

  function ClientComponent_onTheServer() {
    throw new Error(`'use client' function '${$$id}' called on the server`)
  }
}

type ClientExport = ReturnType<typeof generateClientExport>
type ClientProxyExports = Record<string, ClientExport>
const clientProxyCache = new Map<string, ClientProxyExports>()

async function generateClientModuleProxy(modulePath: Pathname) {
  const transpiler = new Transpiler({
    target: "browser",
    allowBunRuntime: false,
    minifyWhitespace: false,
    inline: false,
    autoImportJSX: true,
    trimUnusedImports: false,
    deadCodeElimination: false,
    jsxOptimizationInline: false,
    treeShaking: false,
    define,
    // exports,
    // loader,
    // logLevel,
    // macro,
    // tsconfig,
  })

  let exports = clientProxyCache.get(modulePath)
  if (!exports) {
    exports = {}
    const moduleSourceOriginal = await Bun.file(modulePath).text()
    const ext = modulePath.split(".").pop() as JavaScriptLoader
    const moduleSourceTransformed = await transpiler.transform(moduleSourceOriginal, ext)
    const moduleIO = transpiler.scan(moduleSourceTransformed)

    moduleIO.exports.forEach(key => {
      exports![key] = generateClientExport(key, modulePath)
    })

    clientProxyCache.set(modulePath, exports)
  }

  return exports
}

export const useClient_fromServer_pluginConfig: BunPlugin = {
  name: "React RSC use client (server)",
  target: "bun",
  async setup(builder) {
    // TODO: look at the first line of the moduleSource to see if it has "use client" or "use server"
    // for now we just look at the file extension and assume that all files ending in .client.js are "use client" files
    builder.onLoad({ filter: /\.client\.(jsx?|tsx?)$/ }, async args => {
      // TODO: look at the first line of the exported function to see if it has "use server"

      // const moduleSourceTransformedWithNoComments = moduleSourceTransformed
      //   .replace(/\/\/.*$/gm, "")
      //   .replace(/\/\*.*\*\//g, "")

      return {
        loader: "object",
        exports: await generateClientModuleProxy(args.path as Pathname),
      }
    })
  },
}
