import React from "react"
import ReactDOMServer from "react-dom/server"

import { arrayToStream } from "@/util/arrayToStream"
import { concatStreams } from "@/util/compoReadableStream"

import { ImportMapScript } from "../client/ImportMap"
import { LinkModulePreloads } from "../client/LinkModulePreloads"
import { clientEntryPointBundle } from "./clientEntryPointBundle"
import { externalsBundle } from "./externalsBundle"
import { polyfillsAndStuff } from "./polyfillsAndStuff"
import type { Pathname, RouteMap } from "./types"

function RootLayout(props: { routes: RouteMap; children?: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
        <LinkModulePreloads pathnames={(Object.keys(props.routes) as Pathname[]).filter(it => it.endsWith(".mjs"))} />
      </head>
      <body>
        <h1>Hello from {__filename.replace(__dirname, "")}</h1>

        <div id="root">
          <div data-id="NOT-generated-by-client">
            pre-rendered by server in <code>{__filename.replace(__dirname, "")}</code>
          </div>
        </div>

        {props.children}
      </body>
    </React.StrictMode>
  )
}

/**
 * TODO: simplifty this once renderToReadableStream HEAD sorting is fixed
 *
 * The importMap script needs to be loaded before the modulepreload
 * But {@link React.version} 19.0.0-canary-e3ebcd54b-20240405 keeps moving the modulepreload above the importMap script
 * so this is a workaround for now
 */
async function HomePageHTMLStream() {
  // ideally this would just be a single call to renderToReadableStream
  return concatStreams(
    arrayToStream(`<!DOCTYPE HTML><HTML lang=en>`),
    await ReactDOMServer.renderToReadableStream(
      <ImportMapScript
        imports={{
          ...externalsBundle.importMap,
          ...clientEntryPointBundle.importMap,
        }}
      />,
    ),
    await ReactDOMServer.renderToReadableStream(
      <RootLayout routes={routes}>
        <script type="module" src={polyfillsAndStuff.name} />
        <script type="module" src={externalsBundle.name!} />
        <script type="module" src={clientEntryPointBundle.name!} />
      </RootLayout>,
    ),
    arrayToStream(`</HTML>`),
  )
}

const fetchHomePageHTML = async () =>
  new Response(await HomePageHTMLStream(), { headers: { "Content-Type": "text/html", "Cache-Control": "no-store" } })

export const routes: RouteMap = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": fetchHomePageHTML,

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text!(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, "Cache-Control": "no-store" },
    }),

  ...(await externalsBundle.createRouteMap()),
  ...(await clientEntryPointBundle.createRouteMap()),
}

export async function fetch(request: Request): Promise<Response> {
  const url = new URL(request.url)
  console.warn(request.method, url.href)

  if (url.pathname in routes) return await routes[url.pathname as Pathname](request)

  // TODO: decide if this is necessary anymore
  // const file = Bun.file(__dirname + url.pathname)
  // if (await file.exists()) return await fetchFileThatExists(request, file)
  /** {@link fetchFileThatExists} */

  return new Response("404 Not Found", { status: 404 })
}

if (import.meta.main) {
  throw new Error("This module is not meant to be run as a script. Try running the main module instead. See package.json")
}
