/// <reference types="react/canary" />
import * as React from "react"
import * as ReactDOM from "react-dom/server"
import { HomeLayout } from "./HomeLayout"
import { HomePage } from "./HomePage"
import { ImportMap_fromPackage } from "./ImportMap_fromPackage"

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

const server = Bun.serve({
  async fetch(req) {
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
  },
})

const browser = Object.assign(
  () => {
    console.log("Hello from browser!")
    console.debug("executing", import.meta.url)
    console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.")
  },
  {
    pathname: "/browser.js",
    toModuleSource: () => js`
      import * as React from "react";
      // export {}; // Make this a module
      const pathname = (${browser.pathname});
      const impl = (${browser});
      const result = await impl();
    `,
  },
)

function Root({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
        <ImportMap_fromPackage />
      </head>

      <>{children}</>
    </React.StrictMode>
  )
}

async function serveHome(req: Request): Promise<Response> {
  const children = (
    <Root>
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <HomeLayout>
        <HomePage />
      </HomeLayout>
    </Root>
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
        `bootstrapScript0.browser.js?_=${timestamp}`, //
        `bootstrapScript1.browser.js?_=${timestamp}`,
      ],

      /** 3.
       * <link rel=modulepreload fetchpriority=low href={bootstrapModules[number]}> // injected in the head
       * <script type=module src={bootstrapModules[number]} /> // injected at the end of the body
       */
      bootstrapModules: [
        `bootstrapModule0.module.js?_=${timestamp}`,
        `bootstrapModule1.module.js?_=${timestamp}`,
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

console.log("Server running at", server.url.href)
