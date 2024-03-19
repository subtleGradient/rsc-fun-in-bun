/// <reference types="bun" />

import { plugin, Transpiler, type JavaScriptLoader } from "bun"
import { registerClientReference } from "react-server-dom-webpack/server.edge"

const generateClientExport = (displayName: string, fileUrl: string) => {
  fileUrl = fileUrl.replace(__dirname, "").replace(/\\/g, "/")
  const $$id = `${fileUrl}#${displayName}`
  ReactClientManifest[$$id] = { id: fileUrl, chunks: [], name: displayName }
  return registerClientReference(Object.assign(ClientComponent_onTheServer, { displayName }), fileUrl, displayName)

  function ClientComponent_onTheServer() {
    throw new Error(`'use client' function '${$$id}' called on the server`)
  }
}

const ReactClientManifest: Record<string, ReactClientManifestRecord> = {}

plugin({
  name: "React Client Manifest",
  setup(build) {
    build.onLoad({ filter: /ReactClientManifest\.json$/ }, () => {
      return { loader: "object", exports: ReactClientManifest }
    })
  },
})

plugin({
  name: "React RSC use client (server)",
  target: "bun",
  async setup(builder) {
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
      // define,
      // exports,
      // loader,
      // logLevel,
      // macro,
      // tsconfig,
    })

    builder.onLoad({ filter: /\.client\.(jsx?|tsx?)$/ }, async args => {
      let exports = clientProxyCache.get(args.path)
      if (!exports) {
        exports = {}
        const moduleSourceOriginal = await Bun.file(args.path).text()
        const ext = args.path.split(".").pop() as JavaScriptLoader
        const moduleSourceTransformed = await transpiler.transform(moduleSourceOriginal, ext)
        const moduleIO = transpiler.scan(moduleSourceTransformed)

        // const moduleSourceTransformedWithNoComments = moduleSourceTransformed
        //   .replace(/\/\/.*$/gm, "")
        //   .replace(/\/\*.*\*\//g, "")

        // TODO: look at the first line of the moduleSource to see if it has "use client" or "use server"
        // TODO: look at the first line of the exported function to see if it has "use server"

        moduleIO.exports.forEach(key => {
          exports![key] = generateClientExport(key, args.path)
        })

        clientProxyCache.set(args.path, exports)
      }

      return { loader: "object", exports }
    })
  },
})

type ClientExport = ReturnType<typeof generateClientExport>
type ClientProxyExports = Record<string, ClientExport>
const clientProxyCache = new Map<string, ClientProxyExports>()

type ReactClientManifestRecord = { id: string; chunks: unknown; name: string }
