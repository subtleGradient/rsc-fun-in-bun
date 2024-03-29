import { verifyReactServer } from "../verify-react-server"

await verifyReactServer()

import React, { Suspense } from "react"
import ReactDOM from "react-dom"
// import ReactDOMServer from "react-dom/server.bun" // importing it here breaks because of ReactCurrentCache
import RSDWClient from "react-server-dom-webpack/client"
import RSDWServer from "react-server-dom-webpack/server.edge"

if (process.env["this stops this stuff from being uninstalled"]) console.log([React, ReactDOM, RSDWServer, RSDWClient])

import type { JavaScriptLoader } from "bun"
import path from "path"
import { arrayToStream } from "../util/arrayToStream"
import { concatStreams } from "../util/compoReadableStream"
import { createTextTransformStream } from "../util/createTransformStream"
import { HomeLayout } from "./HomeLayout"
import { HomePage } from "./HomePage"
import { ImportMap_fromPackage } from "./ImportMap_fromPackage"
import { RootComponent } from "./RootComponent"
import { Timer } from "./Timer.client"
import { html, js } from "./js"

const transpiler = new Bun.Transpiler()

export async function router(req: Request): Promise<Response> {
  const url = new URL(req.url)

  const pathToFile = path.join(process.cwd(), url.pathname)
  const requestedFile = Bun.file(pathToFile)
  if (await requestedFile.exists()) {
    const ext = path.extname(pathToFile) as JavaScriptLoader
    return new Response(await transpiler.transform(await requestedFile.text(), ext), {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store",
      },
    })
  } else {
    console.log("File does not exist", pathToFile)
  }

  if (url.pathname === browser.pathname) {
    return new Response(await browser.toModuleSource(), { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname === RSC2.pathname) {
    return new Response(await RSC2.toModuleSource(), { headers: { "Content-Type": "text/html" } })
  }

  if (url.pathname === RSC.pathname) {
    return new Response(await RSC.toModuleSource(), {
      headers: {
        "Content-Type": "application/javascript",
        "Cache-Control": "no-store",
      },
    })
  }

  if (url.pathname.endsWith(".js")) {
    const source = `console.log('Hello from ${url.pathname}')`
    return new Response(source, { headers: { "Content-Type": "application/javascript" } })
  }

  if (url.pathname === "/") return serveHome(req)

  return new Response("404", { status: 404 })
}

const RSC2 = Object.assign(
  () => {
    console.log("Hello from RSC!")
    console.debug("executing", import.meta.url)
    console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")
  },
  {
    pathname: "/rsc.html",
    toModuleSource: async () => {
      const Sleep = async () => {
        await new Promise(resolve => setTimeout(resolve, 1000))
        return <>Slept for 1 second</>
      }

      const children = (
        <div>
          <h1>Hello from RSC!</h1>
          <Sleep />
          <Timer />
          <Suspense fallback="Loading...">
            <Sleep />
          </Suspense>
        </div>
      )

      console.log((Timer as any).$$id)

      const ReactClientManifest = await import("./ReactClientManifest.json")
      console.log({ ReactClientManifest })

      const rscStream = RSDWServer.renderToReadableStream(children, ReactClientManifest, {
        onError: error => {
          console.error("Error rendering", error)
        },
        // identifierPrefix: "identifierPrefix",
        // environmentName: "environmentName",
        onPostpone: postpone => {
          console.log("Postponing", postpone)
        },
      })

      const ReactDOMServer = await import("react-dom/server")
      const htmlStream = arrayToStream(
        html`<!DOCTYPE html>`,
        "\n",
        `<HTML>`,
        "\n",
        ReactDOMServer.renderToString(
          <>
            <head>
              <title>Hello from RSC!</title>
              {await ImportMap_fromPackage()}
              <script
                dangerouslySetInnerHTML={{
                  __html: js`
                  __webpack_require__ = async function (moduleId) {
                    console.log("require", moduleId)
                    return await import(moduleId)
                  }
              `,
                }}
              />
            </head>
          </>,
        ),
        "\n",
        `<BODY>`,
        "\n",
        ReactDOMServer.renderToString(
          <>
            <h1>Hello from RSC!</h1>
            <div id="root" />
            <script type="module" src="/examples/client-bootstrap.js" />
          </>,
        ),
        "\n",
        html`<script>
          console.log("Hello from RSC!")
        </script>`,
      )

      let lastTime = Date.now()

      const rscChonkToScript = createTextTransformStream(rsc => {
        const elapsed = Date.now() - lastTime
        lastTime = Date.now()
        return `<script>/* elapsed = ${elapsed}ms */${js`(self.__RSC??=[]).push(${"`"}${rsc}${"`"})`}</script>` + "\n\n"
      })

      return concatStreams(htmlStream, rscStream.pipeThrough(rscChonkToScript), arrayToStream(html`</BODY></HTML>`))
    },
  },
)

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
