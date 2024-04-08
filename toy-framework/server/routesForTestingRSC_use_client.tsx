import { useClient_fromServer_pluginConfig } from "@/plugins/useClient_fromServer.plugin"
import { js } from "@/util/js"
import { type ReactElement } from "react"
import { HTMLPageStream } from "./HTMLPageStream"
import type { RouteMap } from "./types"

const RSC_TYPE = "text/x-component"

export const routesForTestingRSC_use_client: RouteMap = {
  "/rsc/test-client": rscClientTest,
  "/rsc/test-client-render": rscClientRender,
}

async function rscClientTest(request: Request): Promise<Response> {
  Bun.plugin({
    ...useClient_fromServer_pluginConfig,
  })
  const ReactServerDOMServer = await import("react-server-dom-webpack/server.edge")
  const { ExampleClientComponent } = await import("../../examples/example0.client")

  let rscStream = ReactServerDOMServer.renderToReadableStream(
    <div>
      hi
      <ExampleClientComponent />
    </div>,
    {
      ["/examples/example0.client.tsx#ExampleClientComponent"]: {
        name: "ExampleClientComponent",
        id: "/examples/example0.client.tsx",
        chunks: [],
      },
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

async function rscClientRender() {
  return new Response(await HTMLPageStream({ children: <RSCDemo /> }), {
    headers: { "Content-Type": "text/html", "Cache-Control": "no-store" },
  })
}

declare global {
  interface Window {
    __NOT__webpack_modules__: Record<string, { exports: unknown }>
  }
}

function RSCDemo() {
  async function main() {
    const { jsxDEV } = await import("react/jsx-dev-runtime")

    console.log("running", import.meta.url)

    const React = (await import("react")).default
    const ReactDOMClient = (await import("react-dom/client")).default
    const ReactServerDOMClient = (await import("react-server-dom-webpack/client")).default

    console.log("react@" + React.version)
    console.log(ReactServerDOMClient)

    const root = ReactDOMClient.createRoot(document.getElementById("rsc-root")!)

    const ui = await ReactServerDOMClient.createFromFetch<ReactElement>(
      fetch(new Request("/rsc/test-client", { headers: { Accept: "text/x-component" } })),
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

    window.__NOT__webpack_modules__["/examples/example0.client.tsx"] = {
      exports: {
        ExampleClientComponent: () => <div>hello from client</div>,
      },
    }

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
