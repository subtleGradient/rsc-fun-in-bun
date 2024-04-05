import type { BunFile, Server } from "bun"
import ReactDOMServer from "react-dom/server"
import { ImportMap } from "./examples/ImportMap"
import { importMapReact } from "./examples/ImportMap_fromPackage"
import { js, tsx } from "./examples/js"

type Pathname = string
type RouteMap = Record<Pathname, Server["fetch"]>

/**
 * Based on the {@link importMapReact}, return the module ID that corresponds to the given file path.
 */
const getModuleIdByFilePath = (name: string) => Object.entries(importMapReact).find(([_, path]) => name?.endsWith(path))?.[0]

/**
 * A virtual file that contains stuff that needs to be loaded before the client entry point.
 */
const polyfillsAndStuff = {
  name: "/generated-on-the-fly/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser" }).transform(tsx`
/// <reference lib="dom" />
window.__webpack_modules__ = {}
window.require = window.__webpack_require__ = (moduleId) => __webpack_modules__[moduleId].exports
`),
}

/**
 * A virtual folder that exposes the virtual client entry point files to the server.
 */
const clientEntryPoint = {
  publicPath: "/clientEntryPoint/",
  entrypoints: ["./demo-RSC.clientEntryPoint.tsx"],

  name: null as string | null,

  async createRouteMap(): Promise<RouteMap> {
    this.createRouteMap = async () => routes // memoize
    const routes: RouteMap = {}

    const { success, logs, outputs } = await this.build()

    if (!success) {
      logs.forEach(log => console.warn(log))
      throw new Error("Failed to build client entry point")
    }

    for (const output of outputs) {
      const pathname = `${this.publicPath}${output.path}`.replace("/./", "/")
      const headers = { "Content-Type": output.type, "Cache-Control": "no-store" }
      routes[pathname] = async () => new Response(output.stream(), { headers })
      output.kind
    }
    // for (const output of outputs) {
    //   const pathname = `${this.publicPath}${output.path}`.replace("/./", "/")
    //   if (output.kind === "entry-point") this.name ||= pathname
    // }

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

function HomeLayout() {
  return (
    <html>
      <head>
        <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
        <ImportMap imports={importMapReact} />
      </head>
      <body>
        <h1>Hello from {__filename.replace(__dirname, "")}</h1>

        <div id="root">
          <div data-id="NOT-generated-by-client">
            pre-rendered by server in <code>{__filename.replace(__dirname, "")}</code>
          </div>
        </div>

        <script type="module" src={polyfillsAndStuff.name} />
        <script type="module" src={clientEntryPoint.name} />
      </body>
    </html>
  )
}

const fetchFileThatExists = async (request: Request, file: BunFile) => {
  const moduleId = getModuleIdByFilePath(file.name!)
  const source = await file.text()
  const esmFromCommonJS = js`
      const module = { ...${{ id: moduleId }}, exports: {} }
      __webpack_modules__[module.id] = module
      const { exports } = module
      console.log("esmFromCommonJS", module)
      export default exports
    `.replace(/^\s+/gm, "")

  let innards
  // if (moduleId) innards = arrayToStream(esmFromCommonJS, await new Bun.Transpiler({ target: "browser" }).transform(source))
  // else
  {
    innards = (
      await Bun.build({
        format: "esm",
        target: "browser",
        entrypoints: [file.name!],
        // external: (await clientEntryPoint.scan()).imports.map(i => i.path),
      })
    ).outputs[0]
  }
  return new Response(innards, { headers: { "Content-Type": file.type, "Cache-Control": "no-store" } })
}

const routes: RouteMap = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": async () =>
    new Response(await ReactDOMServer.renderToReadableStream(<HomeLayout />), {
      headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
    }),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  ...(await clientEntryPoint.createRouteMap()),
}

export default function serve() {
  return Bun.serve({
    async fetch(request) {
      const url = new URL(request.url)

      if (url.pathname in routes) return await routes[url.pathname](request)

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
}
