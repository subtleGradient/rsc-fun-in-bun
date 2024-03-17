import { plugin, Transpiler, type JavaScriptLoader } from "bun"

const tsx = String.raw
const html = String.raw

const TEMPLATE_CLIENT_EXPORT = tsx`
export const __NAME__ = Object.assign(
  () => { throw new Error("'use client' function '__NAME__' called on the server") },
  { $$typeof: Symbol.for("react.client.reference"), $$id: "__ID__" }
)
`
const generateClientExport = (name: string, fileUrl: string) => {
  // const modProxy = createClientModuleProxy(fileUrl)
  // console.log("modProxy", modProxy)
  fileUrl = fileUrl.replace(__dirname, "").replace(/\\/g, "/")
  const $$id = `${fileUrl}#${name}`
  ReactClientManifest[$$id] = {} // TODO: What goes here?
  return TEMPLATE_CLIENT_EXPORT.replace(/__NAME__/g, name).replace(/__ID__/g, $$id)
}

const ReactClientManifest: Record<string, unknown> = {}

plugin({
  name: "React Client Manifest",
  setup(build) {
    build.module("ReactClientManifest.json", () => {
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
      const content = await Bun.file(args.path).text()
      const ext = args.path.split(".").pop() as JavaScriptLoader
      const mod = transpiler.scan(await transpiler.transform(content, ext))
      const exportsCode = mod.exports.map(key => generateClientExport(key, args.path)).join("\n")

      const contents = tsx`
        console.debug("executing", import.meta.url)
        ${exportsCode}
      `
      return { loader: "tsx", contents }
    })
  },
})
