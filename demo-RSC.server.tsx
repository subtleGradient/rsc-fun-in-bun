import type { BunFile } from "bun"
import ReactDOMServer from "react-dom/server"
import { ImportMap } from "./examples/ImportMap"
import { importMapReact } from "./examples/ImportMap_fromPackage"
import { js, tsx } from "./examples/js"

const getModuleIdByFilePath = (name: string) => Object.entries(importMapReact).find(([_, path]) => name?.endsWith(path))?.[0]

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

const clientEntryPoint = {
  name: "/demo-RSC.clientEntryPoint.tsx",
  type: "text/javascript",
  publicPath: "/clientEntryPoint/",

  get entrypoints() {
    return [`.${this.name}`, "./demo-RSC.clientEntryPoint2.tsx"]
  },

  async routes() {
    const routes: Record<string, () => Promise<Response>> = {}
    const { outputs } = await this.build()
    for (const output of outputs)
      routes[`${this.publicPath}${output.path}`.replace("/./", "/")] = async () =>
        new Response(output.stream(), { headers: { "Content-Type": output.type, "Cache-Control": "no-store" } })

    routes[this.name] = routes[`${this.publicPath}demo-RSC.clientEntryPoint.js`]
    return routes
  },

  build() {
    this.build = () => build
    const build = Bun.build({
      format: "esm",
      target: "browser",
      splitting: true,
      publicPath: this.publicPath,
      sourcemap: "external",
      entrypoints: this.entrypoints,
    })
    return build
  },

  // TODO: memoize this
  async scan() {
    const ttt = new Bun.Transpiler({ target: "browser" })
    return ttt.scan(await ttt.transform(clientEntryPoint.name))
  },
}

console.log(await clientEntryPoint.build().then(it => it.outputs))

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

const fileExists = Symbol.for("file that exists")

const routes = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": async () =>
    new Response(await ReactDOMServer.renderToReadableStream(<HomeLayout />), {
      headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
    }),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  ...(await clientEntryPoint.routes()),

  [fileExists]: async (file: BunFile) => {
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
  },
}

console.log(Object.keys(routes))

export default function serve() {
  return Bun.serve({
    async fetch(request) {
      const url = new URL(request.url)

      if (url.pathname in routes) return await routes[url.pathname]()

      const file = Bun.file(__dirname + url.pathname)
      if (await file.exists()) return await routes[fileExists](file)

      return new Response("404 Not Found", { status: 404 })
    },
  })
}

if (import.meta.main) {
  const server = serve()
  console.log("Server running at", server.url.href)
}
