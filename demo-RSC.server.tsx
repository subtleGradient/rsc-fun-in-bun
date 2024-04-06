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

const define: Record<string, string> = {
  __webpack_require__: "__NOT__webpack_require__",
  __webpack_modules__: "__NOT__webpack_modules__",
  __webpack_chunk_load__: "__NOT__webpack_chunk_load__",
  "process.env.NODE_ENV": process.env.NODE_ENV! === "production" ? '"production"' : '"development"',
  __DEV__: process.env.NODE_ENV! === "development" ? "true" : "false",
}

/**
 * A virtual file that contains stuff that needs to be loaded before the client entry point.
 */
const polyfillsAndStuff = {
  name: "/!/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser", loader: "tsx", define }).transform(tsx`
/// <reference lib="dom" />
const webpackGetChunkFilename = (chunkId: string) => { throw new Error("webpackGetChunkFilename not implemented") }

const __NOT__webpack_modules__ = {}
const __NOT__webpack_chunk_load__ = (chunkId: string) => { throw new Error("chunk loading not implemented") }
const __NOT__webpack_require__ = Object.assign(
  (moduleId: string) => __NOT__webpack_modules__[moduleId].exports, //
  { m: {}, c: webpackGetChunkFilename, d: {}, n: {}, o: {}, p: {}, s: {} },
)

Object.assign(window, { __NOT__webpack_modules__, __NOT__webpack_chunk_load__, __NOT__webpack_require__ })
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
      sourcemap: "external",
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

function LinkModulePreloads() {
  return (
    <>
      {Object.keys(routes)
        .filter(it => it.endsWith(".mjs"))
        .map(pathname => (
          <link rel="modulepreload" key={pathname} href={pathname} />
        ))}
    </>
  )
}

/**
 * TODO: merge {@link HomeImportMap} into {@link HomeLayout} once renderToReadableStream HEAD sorting is fixed
 * The importMap script needs to be loaded before the modulepreload
 * But {@link React.version} 19.0.0-canary-e3ebcd54b-20240405 keeps moving the modulepreload above the importMap script
 * so this is a workaround for now
 */
function HomeImportMap() {
  return (
    <ImportMapScript
      imports={{
        ...externalsBundle.importMap,
        ...clientEntryPointBundle.importMap,
      }}
    />
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

async function fetchFileThatExists(request: Request, file: BunFile) {
  const build = await Bun.build({
    format: "esm",
    target: "browser",
    entrypoints: [file.name!],
    define,
    external: Object.keys(externalsBundle.importMap),
  })
  const output = build.outputs[0]
  return new Response(output, { headers: { "Content-Type": output.type, "Cache-Control": "no-store" } })
}

const routes: RouteMap = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": async () =>
    new Response(
      // TODO: avoid concatStreams once renderToReadableStream HEAD sorting is fixed
      // ideally this would just be a single call to renderToReadableStream
      // but the importMap script needs to be loaded before the modulepreload
      // but React 19.0.0-canary-e3ebcd54b-20240405 keeps moving the modulepreload above the importMap script
      // so this is a workaround for now
      concatStreams(
        arrayToStream(`<!DOCTYPE HTML><HTML lang=en>`),
        await ReactDOMServer.renderToReadableStream(<HomeImportMap />),
        await ReactDOMServer.renderToReadableStream(<HomeLayout />),
        arrayToStream(`</HTML>`),
      ),
      { headers: { "Content-Type": "text/html", "Cache-Control": "no-store" } },
    ),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  ...(await externalsBundle.createRouteMap()),
  ...(await clientEntryPointBundle.createRouteMap()),
}

export async function fetch(request: Request): Promise<Response> {
  const url = new URL(request.url)
  console.warn("\t" + url.href)

  if (url.pathname in routes) return await routes[url.pathname as Pathname](request)

  const file = Bun.file(__dirname + url.pathname)
  if (await file.exists()) return await fetchFileThatExists(request, file)

  return new Response("404 Not Found", { status: 404 })
}

export default function serve() {
  return Bun.serve({ fetch })
}

if (import.meta.main) {
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
