/// <reference types="bun" />

import { define } from "@/toy-framework/server/polyfillsAndStuff"
import { $, Transpiler, type BunPlugin, type JavaScriptLoader } from "bun"
import { registerClientReference } from "react-server-dom-webpack/server.edge"
import { ReactClientManifest } from "./ReactClientManifest.plugin"

const REPO_ROOT = (await $`git rev-parse --show-toplevel`.text()).trim()

function generateClientExport(displayName: string, fileUrl: string) {
  fileUrl = fileUrl.replace(REPO_ROOT, "").replace(/\\/g, "/")
  const $$id = `${fileUrl}#${displayName}`
  ReactClientManifest[$$id] = { id: fileUrl, chunks: [], name: displayName }
  return registerClientReference(Object.assign(ClientComponent_onTheServer, { displayName }), fileUrl, displayName)

  function ClientComponent_onTheServer() {
    throw new Error(`'use client' function '${$$id}' called on the server`)
  }
}

type ClientExport = ReturnType<typeof generateClientExport>
type ClientProxyExports = Record<string, ClientExport>
const clientProxyCache = new Map<string, ClientProxyExports>()

async function generateClientModuleProxy(modulePath: string) {
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
        exports: await generateClientModuleProxy(args.path),
      }
    })
  },
}
