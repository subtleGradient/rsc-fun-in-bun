import { resolve } from "bun"
import type { ImportMap, Pathname, RouteMap } from "../types"
import { externalsBundle } from "./externalsBundle"
import { noCacheHeaders } from "./headers"
import { define } from "./polyfillsAndStuff"

/**
 * A virtual folder that exposes the virtual client entry point files to the server.
 */
export const clientEntryPointBundle = {
  publicPath: "/!/clientEntryPoint/" as Pathname,
  entrypoints: [await resolve("../client/clientEntryPoint.tsx", __dirname)],

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
      const headers = { "Content-Type": output.type, ...noCacheHeaders }
      routes[pathname] = async () => new Response(output, { headers })
      if (output.kind === "entry-point") this.name ||= pathname
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
      sourcemap: "external",
      minify: process.env.NODE_ENV === "production",
      define,
      naming: {
        entry: "[name].mjs",
        chunk: "[name]-[hash].mjs",
        asset: "[name]-[hash][ext]",
      },
      external: Object.keys(externalsBundle.importMap),
    })
    return build
  },

  async scan() {
    this.scan = async () => scan
    const transpiler = new Bun.Transpiler({ target: "browser", define })
    const scan = transpiler.scan(await transpiler.transform(this.entrypoints[0]))
    return scan
  },
}
