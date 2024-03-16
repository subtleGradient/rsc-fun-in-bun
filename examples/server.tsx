/// <reference types="react" />
/// <reference types="react/canary" />
/// <reference types="react/experimental" />
/// <reference types="react-dom" />
/// <reference types="react-dom/canary" />
/// <reference types="react-dom/experimental" />

import { verifyReactServer } from "./verify-react-server"

verifyReactServer()

import React from "react"
import { preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule } from "react-dom"
const ReactDOM = { preconnect, prefetchDNS, preinit, preinitModule, preload, preloadModule }
import ReactDOMServer from "react-dom/server"

type IReactServerSharedInternals = {
  ReactCurrentCache: {
    current?: {
      getCacheSignal: () => unknown
      getCacheForType: (createFetchCache: () => unknown) => unknown
    }
  }
}

const SERVER_INTERNALS_KEY = Object.keys(React).find(key => key.includes("SERVER_INTERNALS")) ?? ""
const ReactServerSharedInternals: IReactServerSharedInternals = (React as any)[SERVER_INTERNALS_KEY]

console.assert(
  ReactServerSharedInternals,
  // https://github.com/oven-sh/bun/issues/8990
  // https://nodejs.org/api/cli.html#-c-condition---conditionscondition
  "ReactServerSharedInternals should be defined; You may need to run with --conditions=react-server or upgrade bun",
  process.argv,
  Object.keys(React).filter(key => key.includes("INTERNALS")),
)

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

  const reactStream = await ReactDOMServer.renderToReadableStream(
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
       * but this gets injected before we can render a ImportMap_fromPackage
       */
      bootstrapModules: [
        // `bootstrapModule0.module.js?_=${timestamp}`,
        // `bootstrapModule1.module.js?_=${timestamp}`,
        // `${browser.pathname}?_=${timestamp}`,
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
