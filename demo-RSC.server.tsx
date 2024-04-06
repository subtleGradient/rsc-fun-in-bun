import type { BunFile, Server } from "bun"
import ReactDOMServer from "react-dom/server"
import { ImportMapScript } from "./examples/ImportMap"
import { js, tsx } from "./examples/js"
import { arrayToStream } from "./util/arrayToStream"
import { concatStreams } from "./util/compoReadableStream"

type Pathname = `/${string}`
type ModuleID = string
type RouteMap = Record<Pathname, Server["fetch"]>
type ImportMap = Record<ModuleID, Pathname>

/**
 * A virtual file that contains stuff that needs to be loaded before the client entry point.
 */
const polyfillsAndStuff = {
  name: "/!/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser", loader: "tsx" }).transform(tsx`
/// <reference lib="dom" />
window.__webpack_modules__ ??= {}

const webpackGetChunkFilename = () => {}
window.__webpack_require__ = Object.assign(
  (moduleId: string) => __webpack_modules__[moduleId].exports, //
  { m: {}, c: webpackGetChunkFilename, d: {}, n: {}, o: {}, p: {}, s: {} },
)
`),
}

const externalsBundle = {
  publicPath: "/!/externals/" as Pathname,
  entrypoints: ["./demo-RSC.clientEntryPoint.externals.tsx"],

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

    ;(await this.scan()).imports.forEach(({ path: moduleId }) => {
      const pathname = `${this.publicPath}${moduleId.replaceAll("/", ":")}.mjs`.replace("/./", "/") as Pathname
      const headers = { "Content-Type": "text/javascript", "Cache-Control": "no-store" }
      let source = js`export default __webpack_require__("${moduleId}");`
      if (moduleId === "react/jsx-dev-runtime")
        source += js`
        const { jsxDEV, Fragment } = window;
        export { jsxDEV, Fragment };
      `
      routes[pathname] = async () => new Response(source, { headers })
      this.importMap[moduleId] = pathname
    })

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
    const transpiler = new Bun.Transpiler({ target: "browser" })
    const scan = transpiler.scan(await transpiler.transform(await Bun.file(this.entrypoints[0]).text(), "tsx"))
    return scan
  },
}

/**
 * A virtual folder that exposes the virtual client entry point files to the server.
 */
const clientEntryPointBundle = {
  publicPath: "/!/clientEntryPoint/" as Pathname,
  entrypoints: ["./demo-RSC.clientEntryPoint.tsx"],

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
    const transpiler = new Bun.Transpiler({ target: "browser" })
    const scan = transpiler.scan(await transpiler.transform(this.entrypoints[0]))
    return scan
  },
}

function LinkModulePreloads() {
  return (
    <head>
      {Object.keys(routes)
        .filter(it => it.endsWith(".mjs"))
        .map(pathname => (
          <link rel="modulepreload" key={pathname} href={pathname} />
        ))}
    </head>
  )
}

function HomeLayout() {
  return (
    <>
      <head>
        <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
        <LinkModulePreloads />
      </head>
      <body>
        <h1>Hello from {__filename.replace(__dirname, "")}</h1>

        <div id="root">
          <div data-id="NOT-generated-by-client">
            pre-rendered by server in <code>{__filename.replace(__dirname, "")}</code>
          </div>
        </div>

        <script type="module" src={polyfillsAndStuff.name} />
        <script type="module" src={externalsBundle.name!} />
        <script type="module" src={clientEntryPointBundle.name!} />
      </body>
    </>
  )
}

const fetchFileThatExists = async (request: Request, file: BunFile) => {
  const build = await Bun.build({
    format: "esm",
    target: "browser",
    entrypoints: [file.name!],
  })
  return new Response(build.outputs[0], { headers: { "Content-Type": file.type, "Cache-Control": "no-store" } })
}

const routes: RouteMap = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": async () =>
    new Response(
      concatStreams(
        arrayToStream(`<!doctype html><HTML lang=en>`),
        await ReactDOMServer.renderToReadableStream(<ImportMapScript imports={importMap} />),
        await ReactDOMServer.renderToReadableStream(<HomeLayout />),
      ),
      {
        headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
      },
    ),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  ...(await externalsBundle.createRouteMap()),
  ...(await clientEntryPointBundle.createRouteMap()),
}

const importMap: ImportMap = {
  ...externalsBundle.importMap,
  ...clientEntryPointBundle.importMap,
}

export default function serve() {
  return Bun.serve({
    async fetch(request) {
      const url = new URL(request.url)
      console.warn("\t" + url.href)

      if (url.pathname in routes) return await routes[url.pathname as Pathname](request)

      const file = Bun.file(__dirname + url.pathname)
      if (await file.exists()) return await fetchFileThatExists(request, file)

      return new Response("404 Not Found", { status: 404 })
    },
  })
}

if (import.meta.main) {
  // console.log(await clientEntryPoint.build().then(it => it.outputs))

  const server = serve()

  console.log("Server running at", server.url.href)
  console.log(
    "    Responds to these routes:\n",
    Object.keys(routes)
      .map(pathname => `\t${server.url.origin}${pathname}`)
      .join("\n"),
  )
  console.log()
}
