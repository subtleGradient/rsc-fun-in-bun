import { resolve } from "bun"
import { js } from "../../util/js"
import { define } from "./polyfillsAndStuff"
import type { ImportMap, Pathname, RouteMap } from "./types"

export const externalsBundle = {
  publicPath: "/!/externals/" as Pathname,
  entrypoints: [await resolve("../client/clientEntryPoint.externals.tsx", __dirname)],

  name: null as string | null,
  importMap: {} as ImportMap,

  async createRouteMap(): Promise<RouteMap> {
    this.createRouteMap = async () => routes // memoize
    const routes: RouteMap = {}

    const { success, logs, outputs } = await this.build()

    if (!success) {
      logs.forEach(log => console.warn(log))
      throw new Error("Failed to build client entry point")
    }

    for (const output of outputs) {
      const pathname = `${this.publicPath}${output.path}`.replace("/./", "/") as Pathname
      const headers = { "Content-Type": output.type, "Cache-Control": "no-store" }
      routes[pathname] = async () => new Response(output, { headers })
      if (output.kind === "entry-point") this.name ||= pathname
    }

    const transpiler = new Bun.Transpiler({ target: "browser", define })
    const { imports } = await this.scan()
    for (const { path: moduleId } of imports) {
      let source = js`export default __webpack_require__("${moduleId}");`

      // TODO: finish scanning the exports of the module. Will need to bundle the module first, using `external: ["*"]` to avoid bundling the module's dependencies
      // const resolvePath = (await import.meta.resolve(moduleId)).replace("file://", "")
      // const { exports } = transpiler.scan(await Bun.file(resolvePath).text())
      // console.log({ moduleId, resolvePath, exports })
      // TODO: seems like this should not be necessary
      // hack to make react/jsx-runtime and react/jsx-dev-runtime work
      {
        if (moduleId === "react/jsx-dev-runtime")
          source += js`
            const  { Fragment, jsxDEV } = __webpack_require__("${moduleId}");
            export { Fragment, jsxDEV };
        `
        if (moduleId === "react/jsx-runtime")
          source += js`
            const  { Fragment, jsx } = __webpack_require__("${moduleId}");
            export { Fragment, jsx };
          `
      }
      const pathname = `${this.publicPath}${moduleId.replaceAll("/", ":")}.mjs` as Pathname
      const headers = { "Content-Type": "text/javascript", "Cache-Control": "no-store" }
      routes[pathname] = async () => new Response(await transpiler.transform(source, "js"), { headers })
      this.importMap[moduleId] = pathname
    }

    return routes
  },

  build() {
    this.build = () => build
    const build = Bun.build({
      publicPath: this.publicPath,
      entrypoints: this.entrypoints,
      splitting: true,
      format: "esm",
      target: "browser",
      sourcemap: "inline",
      minify: process.env.NODE_ENV === "production",
      define,
      naming: {
        entry: "[name].mjs",
        chunk: "[name]-[hash].mjs",
        asset: "[name]-[hash][ext]",
      },
    })
    return build
  },

  async scan() {
    this.scan = async () => scan
    const transpiler = new Bun.Transpiler({ target: "browser", define })
    const scan = transpiler.scan(await transpiler.transform(await Bun.file(this.entrypoints[0]).text(), "tsx"))
    return scan
  },
}
