import { js } from "@/util/js"
import { sleep } from "bun"
import { Suspense, type ReactElement } from "react"
import { HTMLPageStream } from "./HTMLPageStream"
import type { RouteMap } from "./types"

const RSC_TYPE = "text/x-component"

export const routesForTestingRSC_suspense: RouteMap = {
  "/rsc/test-suspense": rscSuspenseTest,
  "/rsc/test-suspense-render": rscSuspenseRender,
}

async function rscSuspenseTest(request: Request): Promise<Response> {
  const ReactServerDOMServer = await import("react-server-dom-webpack/server.edge")

  async function AsyncView({ sleepForMs }: { sleepForMs: number }) {
    await sleep(sleepForMs)
    return <div id={`AsyncView${sleepForMs}`}>slept for {Math.round(sleepForMs)}ms</div>
  }

  let rscStream = ReactServerDOMServer.renderToReadableStream(
    <div>
      hi
      <Suspense fallback={<div>loading...</div>}>
        <AsyncView sleepForMs={0} />
        <AsyncView sleepForMs={10} />
      </Suspense>
    </div>,
    {
      // ...externalsBundle.webpackMap,
      // ...clientEntryPointBundle.webpackMap,
    },
    {
      onError: console.error,
      identifierPrefix: "rsc",
    },
  )

  return new Response(rscStream, { headers: { "Content-Type": RSC_TYPE, "Cache-Control": "no-store" } })
}

async function rscSuspenseRender() {
  return new Response(await HTMLPageStream({ children: <RSCDemo /> }), {
    headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
  })
}

function RSCDemo() {
  async function main() {
    console.log("running", import.meta.url)

    const React = (await import("react")).default
    console.log("react@" + React.version)

    const ReactDOMClient = (await import("react-dom/client")).default

    const ReactServerDOMClient = (await import("react-server-dom-webpack/client")).default
    console.log(ReactServerDOMClient)

    const rscResponse = await fetch(new Request(`/rsc/test-suspense`, { headers: { Accept: "text/x-component" } }))

    const decoder = new TextDecoder()
    const reader = rscResponse.body!.getReader()
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      console.log(decoder.decode(value))
    }

    /////////////////////////////////////////////

    const root = ReactDOMClient.createRoot(document.getElementById("rsc-root")!)

    const ui = await ReactServerDOMClient.createFromFetch<ReactElement>(
      fetch(new Request(`/rsc/test-suspense`, { headers: { Accept: "text/x-component" } })),
      {
        async callServer<A = unknown, T = unknown>(id: any, args: A): Promise<T> {
          // console.log("calling server", id, args)
          // return "server response" as T
          throw new Error("not implemented")
        },

        encodeFormAction<A>(id: any, args: Promise<A>) {
          return {
            name: "my-awesome-form",
            action: "/rsc/test-suspense",
            method: "POST",
            data: new FormData(),
          }
        },
      },
    )
    root.render(ui)
  }
  return (
    <>
      <h2>Howdy!</h2>
      <h3>testing RSC</h3>
      <div id="rsc-root"></div>
      <script type="module" dangerouslySetInnerHTML={{ __html: js`;(${main})();` }} />
    </>
  )
}
