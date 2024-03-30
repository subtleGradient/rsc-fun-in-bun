import ReactDOMServer from "react-dom/server"
import { ImportMapCustom } from "./examples/ImportMap_fromPackage"
import { tsx } from "./examples/js"

function HomePage() {
  "use bun to transpile this to a client-side component in some kind of smart way or whatevz 🤓"
  return (
    <div id="generated-by-client" suppressHydrationWarning>
      Hello from ClientComponent!
    </div>
  )
}

const clientEntryPoint = {
  name: "/generated-on-the-fly/clientEntryPoint.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser" }).transform(tsx`
/// <reference lib="dom" />
import React from "react"
import ReactDOM from "react-dom/client"
import * as ReactServerDOMClient from "react-server-dom-webpack/client"

console.log(React.version)

const demo_reactPageRoot = ReactDOM.createRoot(document.getElementById("root"))

// TODO: split this stuff out somehow smartly 🤓
const InitialClientComponent = ${HomePage}
demo_reactPageRoot.render(<InitialClientComponent />)
`),
}

const polyfillsAndStuff = {
  name: "/generated-on-the-fly/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser" }).transform(tsx`
/// <reference lib="dom" />
window.__webpack_modules__ = {}
window.__webpack_require__ = (moduleId) => __webpack_modules__[moduleId].exports

import JSX from "react/jsx-dev-runtime"
const { jsxDEV, Fragment } = JSX
Object.assign(window, { jsxDEV, Fragment })
`),
}

function HomeLayout() {
  return (
    <html>
      <head>
        <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
        <ImportMapCustom />
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

const routes = {
  "/": async () =>
    new Response(await ReactDOMServer.renderToReadableStream(<HomeLayout />), {
      headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
    }),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  [clientEntryPoint.name!]: async () =>
    new Response(await clientEntryPoint.text!(), {
      headers: { "Content-Type": clientEntryPoint.type!, "Cache-Control": "no-store" },
    }),
}

export default function serve() {
  return Bun.serve({
    async fetch(request) {
      const url = new URL(request.url)

      if (url.pathname in routes) return await routes[url.pathname]()

      const file = Bun.file(__dirname + url.pathname)

      if (await file.exists()) {
        // const innards = (await Bun.build({ format: "esm", target: "browser", entrypoints: [file.name!] })).outputs[0]
        const innards = await new Bun.Transpiler({ target: "browser" }).transform(await file.text())
        return new Response(innards, { headers: { "Content-Type": file.type, "Cache-Control": "no-store" } })
      }

      return new Response("404 Not Found", { status: 404 })
    },
  })
}

if (import.meta.main) {
  const server = serve()
  console.log("Server running at", server.url.href)
}
