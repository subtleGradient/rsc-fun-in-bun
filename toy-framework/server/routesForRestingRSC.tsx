import { sleep } from "bun"
import { Suspense } from "react"
import type { RouteMap } from "./types"

const RSC_TYPE = "text/x-component"

export const routesForRestingRSC: RouteMap = {
  // "/rsc/test-suspense-render": async function rscSuspenseTestRender(request: Request): Promise<Response> {

  // },

  "/rsc/test-suspense": rscSuspenseTest,
}

async function rscSuspenseTest(request: Request): Promise<Response> {
  const ReactServerDOMServer = await import("react-server-dom-webpack/server.edge")

  async function AsyncView({ sleepForMs }: { sleepForMs: number }) {
    await sleep(sleepForMs)
    return <div>slept for {Math.round(sleepForMs)}ms</div>
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
