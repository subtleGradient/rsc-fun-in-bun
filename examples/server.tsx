/// <reference types="react" />
/// <reference types="react/canary" />
/// <reference types="react/experimental" />
/// <reference types="react-dom" />
/// <reference types="react-dom/canary" />
/// <reference types="react-dom/experimental" />

import React from "react"
import ReactDOM from "react-dom"
// @ts-expect-error
import * as RSDWServer from "react-server-dom-webpack/server"
// @ts-expect-error
import * as RSDWClient from "react-server-dom-webpack/client"

if (process.env["this stops this stuff from being uninstalled"]) console.log([React, ReactDOM, RSDWServer, RSDWClient])

import { verifyReactServer } from "./verify-react-server"

verifyReactServer()

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
    return new Response(browser.toModuleSource(), { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname.endsWith(".js")) {
    const source = `console.log('Hello from ${url.pathname}')`
    return new Response(source, { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname === "/") return serveHome(req)

  return new Response("404", { status: 404 })
}

const browser = Object.assign(
  () => {
    console.log("Hello from browser!")
    console.debug("executing", import.meta.url)
    console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.")
  },
  {
    pathname: "/browser.js",
    toModuleSource: () => js`
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
    </RootComponent>
  )

  const timestamp = Date.now().toString(36)

  const proxy = RSDWServer.createClientModuleProxy("file://some/path/Client.tsx")
  console.log({ proxy })

  const reactStream = "lulz"

  const response = new Response(reactStream, {
    headers: { "Content-Type": "text/html" },
  })

  return response
}

if (import.meta.main) {
  const server = Bun.serve({ fetch: router })
  console.log("Server running at", server.url.href)
}
