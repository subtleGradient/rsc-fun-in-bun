import { plugin, Transpiler, type JavaScriptLoader } from "bun"
const transpiler = new Transpiler()
const tsx = String.raw
const html = String.raw

const TEMPLATE_CLIENT_EXPORT = tsx`
export const __NAME__ = Object.assign(() => {
  throw new Error("use client function '__NAME__' called on the server")
}, {
  displayName: "__NAME__",
  $$id: "__FILE_URL__#__NAME__",
  $$typeof: Symbol.for("react.client.reference"),
})
`
const generateClientExport = (name: string, fileUrl: string) => {
  recentlyImportedClientStuff.set(name, fileUrl)
  fileUrl = fileUrl.replace(process.cwd(), "").replace(/\\/g, "/")
  return TEMPLATE_CLIENT_EXPORT.replace(/__NAME__/g, name).replace(/__FILE_URL__/g, fileUrl)
}

const recentlyImportedClientStuff = new Map<string, string>()

plugin({
  name: "React RSC use client (client)",
  target: "browser",
  setup(build) {
    build.module("recentlyImportedClientStuff.js.html", () => {
      const contents = html`<script>
        ${JSON.stringify(recentlyImportedClientStuff)}
      </script>`
      return { loader: "text", contents }
    })
  },
})

plugin({
  name: "React RSC use client (server)",
  target: "bun",
  async setup(builder) {
    builder.onLoad({ filter: /\.client\.(jsx?|tsx?)$/ }, async args => {
      // console.log("plugin; importing", args.path)
      const content = await Bun.file(args.path).text()
      const ext = args.path.split(".").pop() as JavaScriptLoader
      const mod = transpiler.scan(await transpiler.transform(content, ext))
      // console.log(args.path, mod.exports)
      const exportsCode = mod.exports.map(key => generateClientExport(key, args.path)).join("\n")

      const contents = tsx`
        console.debug("executing", import.meta.url)
        ${exportsCode}
      `
      return { loader: "tsx", contents }
    })
  },
})
