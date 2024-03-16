import { plugin, Transpiler, type JavaScriptLoader } from "bun"
const transpiler = new Transpiler()
const tsx = String.raw

plugin({
  name: "React RSC use client",
  target: "bun",
  async setup(builder) {
    builder.onLoad({ filter: /.client.(jsx?|tsx?)$/ }, async args => {
      // console.log("plugin; importing", args.path)
      const content = await Bun.file(args.path).text()
      const ext = args.path.split(".").pop() as JavaScriptLoader
      const mod = transpiler.scan(await transpiler.transform(content, ext))
      // console.log(args.path, mod.exports)
      const exportsCode = mod.exports.map(key => `export const ${key} = undefined`).join("\n")

      const contents = tsx`
        console.debug("executing", import.meta.url)
        ${exportsCode}
      `

      new Proxy(
        {},
        {
          get: (target, prop) => {
            console.log("proxy get", import.meta.url, prop)
            if (prop === "then") {
              return undefined
            }
            return prop
          },
        },
      )
      return { loader: "tsx", contents }
    })
  },
})
