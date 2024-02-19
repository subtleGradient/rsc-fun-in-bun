/// <reference types="react/canary" />
/// <reference types="react-dom/canary" />

// https://github.com/oven-sh/bun/issues/8990
// https://nodejs.org/api/cli.html#-c-condition---conditionscondition

// import type * as ReactType from "react/canary"
// @ ts-expect-error -- couldn't figure out how to pass --conditions to bun
// const React = (await import("../node_modules/react/react.react-server.js")) as typeof ReactType
// if (!("__SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED" in React))
//   throw new Error("expected the React build with server internals")

import ReactDOM from "react-dom/server"
// import type * as ReactDOMType from "react-dom/canary"
// @ ts-expect-error -- couldn't figure out how to pass --conditions to bun
// const ReactDOM = (await import("../node_modules/react-dom/react-dom.react-server.js")) as typeof ReactDOMType
// TODO: figure out how to verify that ReactDOM is the server build
// TODO: figure out how to make sure that ReactDOM is not requiring a different React file

import { HomeLayout } from "./HomeLayout"
import { HomePage } from "./HomePage"
import { RootComponent } from "./RootComponent"

function js(strings: TemplateStringsArray, ...values: unknown[]) {
  let source = ""
  for (let i = 0; i < strings.length; i++) {
    source += strings[i]
    if (i < values.length) {
      const value = values[i]
      source += typeof value === "function" ? value.toString() : JSON.stringify(value)
    }
  }
  return source
}

function router(req: Request): Response | Promise<Response> {
  const url = new URL(req.url)

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
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    </RootComponent>
  )

  const timestamp = Date.now().toString(36)

  const reactStream = await ReactDOM.renderToReadableStream(
    /** 0. injected as an html string */
    children,
    {
      signal: req.signal,

      onError(error, errorInfo) {
        console.error("ReactDOM.renderToReadableStream", error, errorInfo)
        return "An error occurred"
      },

      /** 1. injected as `<script>${bootstrapScriptContent}</script>` immediately after the react children */
      bootstrapScriptContent: "console.log('Hello from renderToReadableStream bootstrapScriptContent!')",

      /** 2.
       * <link rel=preload as=script fetchpriority=low href={bootstrapScripts[number]}> // injected in the head
       * <script async src={bootstrapScripts[number]} /> // injected at the end of the body
       */
      bootstrapScripts: [
        // `bootstrapScript0.browser.js?_=${timestamp}`, //
        // `bootstrapScript1.browser.js?_=${timestamp}`,
      ],

      /** 3.
       * <link rel=modulepreload fetchpriority=low href={bootstrapModules[number]}> // injected in the head
       * <script type=module src={bootstrapModules[number]} /> // injected at the end of the body
       */
      bootstrapModules: [
        // `bootstrapModule0.module.js?_=${timestamp}`,
        // `bootstrapModule1.module.js?_=${timestamp}`,
        `${browser.pathname}?_=${timestamp}`,
      ],

      // identifierPrefix: "renderToReadableStream identifierPrefix",
      // namespaceURI: "http://www.w3.org/1999/xhtml",
      // nonce: "renderToReadableStream nonce",
      // progressiveChunkSize: 1024,
    },
  )

  const response = new Response(reactStream, {
    headers: { "Content-Type": "text/html" },
  })

  return response
}

if (import.meta.main) {
  const server = Bun.serve({ fetch: router })
  console.log("Server running at", server.url.href)
}
