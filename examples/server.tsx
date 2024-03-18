import { verifyReactServer } from "./verify-react-server"

await verifyReactServer()

import React from "react"
import ReactDOM from "react-dom"
// import ReactDOMServer from "react-dom/server.bun" // importing it here breaks because of ReactCurrentCache
import RSDWClient from "react-server-dom-webpack/client"
import RSDWServer from "react-server-dom-webpack/server.edge"

if (process.env["this stops this stuff from being uninstalled"]) console.log([React, ReactDOM, RSDWServer, RSDWClient])

import { HomeLayout } from "./HomeLayout"
import { HomePage } from "./HomePage"
import { RootComponent } from "./RootComponent"
import { js } from "./js"

const transpiler = new Bun.Transpiler()

async function router(req: Request): Promise<Response> {
  const url = new URL(req.url)

  if (await Bun.file(url.pathname).exists()) {
    return new Response(await transpiler.transform(await Bun.file(url.pathname).text(), "tsx"), {
      headers: { "Content-Type": "application/javascript" },
    })
  } else {
    console.log("file does not exist", url.pathname)
  }

  if (url.pathname === browser.pathname) {
    return new Response(await browser.toModuleSource(), { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname === RSC.pathname) {
    return new Response(await RSC.toModuleSource(), { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname.endsWith(".js")) {
    const source = `console.log('Hello from ${url.pathname}')`
    return new Response(source, { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname === "/") return serveHome(req)

  return new Response("404", { status: 404 })
}

const RSC = Object.assign(
  () => {
    console.log("Hello from RSC!")
    console.debug("executing", import.meta.url)
    console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")
  },
  {
    pathname: "/rsc.js",
    toModuleSource: async () => {
      const rscStream = RSDWServer.renderToReadableStream(<HomePage />, await import("./ReactClientManifest.json"), {
        onError: error => {
          console.error("Error rendering", error)
        },
        identifierPrefix: "identifierPrefix",
        environmentName: "environmentName",
        onPostpone: postpone => {
          console.log("Postponing", postpone)
        },
      })

      const decoder = new TextDecoder()

      return rscStream.pipeThrough(
        new TransformStream({
          transform: (chunk, controller) => {
            // console.log("chunk", decoder.decode(chunk))
            controller.enqueue(`CHONK! (${decoder.decode(chunk)})\n\n`)
          },
        }),
      )
    },
  },
)

const browser = Object.assign(
  () => {
    console.log("Hello from browser!")
    console.debug("executing", import.meta.url)
    console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.")
  },
  {
    pathname: "/browser.js",
    toModuleSource: async () => js`
      import React from "react"
      import ReactDOM from "react-dom"
      import ReactDOM_client from "react-dom/client"

      window.React = React
      window.ReactDOM = ReactDOM

      console.log(React.version)
      console.log(ReactDOM.version)

      const pathname = (${browser.pathname});
      const impl = (${browser});
      const result = await impl();
    `,
  },
)

async function serveHome(req: Request): Promise<Response> {
  const children = (
    <RootComponent>
      <HomeLayout>
        <HomePage />
      </HomeLayout>

      <script src={browser.pathname}></script>
      <script src={RSC.pathname}></script>
    </RootComponent>
  )

  const ReactDOMServer = await import("react-dom/server")
  const htmlStream = await ReactDOMServer.renderToReadableStream(children, {})

  const response = new Response(htmlStream, {
    headers: { "Content-Type": "text/html" },
  })

  return response
}

if (import.meta.main) {
  const server = Bun.serve({ fetch: router })
  console.log("Server running at", server.url.href)
}
