/// <reference types="bun" />

// import { define } from "#toy-framework/server/polyfillsAndStuff"
import { define } from "@rsc-fun-in-bun/toy-framework/server/polyfillsAndStuff"
import type { ClientModuleExportName, Pathname, ReactClientManifestRecord } from "@rsc-fun-in-bun/toy-framework/types"
import { $, type BunPlugin, type JavaScriptLoader } from "bun"
import ReactServerDOMServer from "react-server-dom-webpack/server.edge"
import { ReactClientManifest } from "./ReactClientManifest"

/**
 * This is a bun plugin for a react-server environment.
 *
 * In a react-server environment,
 * import client-only code (files with a "use client" directive at the top),
 * get a ClientModuleProxy via {@link generateClientModuleProxy} instead of the real client component.
 *
 * {@link generateClientReference}
 * Each export in the client module is replaced with a proxy function that throws an error when called on the server.
 *
 * The proxy...
 * - throws an error if called on the server.
 *
 */
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

const REPO_ROOT = (await $`git rev-parse --show-toplevel`.text()).trim()

export const genPathnameRef = {
  /** replace this with your own implementation */
  current: (relativePath: string, name: string): Pathname => `/!/use-client${relativePath}/${name}.mjs`,
}

function generateClientReference(exportName: ClientModuleExportName, absolutePath: Pathname) {
  const relativePath = absolutePath.replace(REPO_ROOT, "").replace(/\\/g, "/")
  const manifest: ReactClientManifestRecord = {
    id: relativePath,
    chunks: [-1, relativePath], // will be replaced with the real chunkId and chunkFilename pairs later
    name: exportName,
  }
  const proxyImplementation = Object.assign(ClientComponent_onTheServer, { displayName: manifest.name })
  const clientReference = ReactServerDOMServer.registerClientReference(proxyImplementation, manifest.id, manifest.name)
  ReactClientManifest[clientReference.$$id] = manifest
  return clientReference

  function ClientComponent_onTheServer() {
    throw new Error(
      `'use client' function '${relativePath}#${exportName}' called on the server! This function should only be called on the client. If you're trying to generate HTML for SSR, you'll need to make sure this bun plugin (${__filename.replace(REPO_ROOT, "")}) is disabled.`,
    )
  }
}

type ClientReference = ReturnType<typeof generateClientReference>
type ClientModuleProxy = Record<ClientModuleExportName, ClientReference>
const cacheClientModuleProxy_byModulePath = new Map<Pathname, ClientModuleProxy>()

async function generateClientModuleProxy(modulePath: Pathname): Promise<ClientModuleProxy> {
  let clientModuleProxy = cacheClientModuleProxy_byModulePath.get(modulePath)
  if (clientModuleProxy) return clientModuleProxy

  const transpiler = new Bun.Transpiler({
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

  const theClientModuleProxy = ReactServerDOMServer.createClientModuleProxy(`file://${modulePath}`)

  clientModuleProxy = {}

  const moduleSourceOriginal = await Bun.file(modulePath).text()
  const ext = modulePath.split(".").pop() as JavaScriptLoader
  const moduleSourceTransformed = await transpiler.transform(moduleSourceOriginal, ext)
  const moduleIO = transpiler.scan(moduleSourceTransformed)

  moduleIO.exports.forEach((exportName: ClientModuleExportName) => {
    clientModuleProxy[exportName] = generateClientReference(exportName, modulePath)
  })

  cacheClientModuleProxy_byModulePath.set(modulePath, clientModuleProxy)

  console.log({ modulePath, theClientModuleProxy, exports: clientModuleProxy })

  return clientModuleProxy
}
