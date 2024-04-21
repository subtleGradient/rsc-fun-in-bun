import { ReactClientManifest } from "@rsc-fun-in-bun/bun-plugins/ReactClientManifest"
import { useClient_fromServer_pluginConfig } from "@rsc-fun-in-bun/bun-plugins/useClient_fromServer.plugin"

import { externalsBundle } from "@rsc-fun-in-bun/toy-framework/server/externalsBundle"
import { noCacheHeaders } from "@rsc-fun-in-bun/toy-framework/server/headers"
import { HTMLPageStream } from "@rsc-fun-in-bun/toy-framework/server/HTMLPageStream"
import { define } from "@rsc-fun-in-bun/toy-framework/server/polyfillsAndStuff"
import { js } from "@rsc-fun-in-bun/toy-framework/server/string-template"
import { routes } from "@rsc-fun-in-bun/toy-framework/server/toy-framework.server"
import type { ImportMap, IReactClientManifest, Pathname, RouteMap } from "@rsc-fun-in-bun/toy-framework/types"
import type { ReactElement } from "react"
import { routesForTestingRSC_use_client_paths } from "./routesForTestingRSC_use_client_paths"

const RSC_TYPE = "text/x-component"

const createClientBundle = (entrypoints: Pathname[]) => ({
  publicPath: "/!/use-client/" as Pathname,
  entrypoints,

  name: null as string | null,
  importMap: {} as ImportMap,

  async createRouteMap(): Promise<RouteMap> {
    this.createRouteMap = async () => routes // memoize
    const routes: RouteMap = {}

    const { success, logs, outputs } = await this.build()

    if (!success) {
      logs.forEach(log => console.warn(log))
      throw new Error("Failed to build client entry point")
    }

    for (const output of outputs) {
      const pathname = `${this.publicPath}${output.path}`.replace("/./", "/") as Pathname
      const headers = { "Content-Type": output.type, ...noCacheHeaders }
      routes[pathname] = async () => new Response(output, { headers })
      if (output.kind === "entry-point") this.name ||= pathname
    }

    return routes
  },

  build() {
    this.build = () => build
    const build = Bun.build({
      publicPath: this.publicPath,
      entrypoints: this.entrypoints,
      splitting: true,
      format: "esm",
      target: "browser",
      sourcemap: "inline",
      minify: process.env.NODE_ENV === "production",
      define,
      naming: {
        entry: "[name].mjs",
        chunk: "[name]-[hash].mjs",
        asset: "[name]-[hash][ext]",
      },
      external: Object.keys(externalsBundle.importMap),
    })
    return build
  },
})

export const routesForTestingRSC_use_client: RouteMap = {
  [routesForTestingRSC_use_client_paths.rsc]: rscClientTest,
  [routesForTestingRSC_use_client_paths.render]: rscClientRender,
}

async function rscClientTest(request: Request): Promise<Response> {
  Bun.plugin(useClient_fromServer_pluginConfig)

  const ReactServerDOMServer = await import("react-server-dom-webpack/server.edge")
  const { ExampleClientComponent } = await import("@/examples/example0.client")

  const $$ids = Object.keys(ReactClientManifest) as (keyof typeof ReactClientManifest)[]

  if (!1!) {
    const entrypoints: Pathname[] = []

    for (const $$id of $$ids) {
      const clientManifest = ReactClientManifest[$$id]
      entrypoints.push(...(clientManifest.chunks as Pathname[]))
    }
    const clientBundle = createClientBundle(entrypoints)
    const clientBundleBuild = await clientBundle.build()
    const entrypointOutputs = clientBundleBuild.outputs.forEach(it => it.kind === "entry-point")

    // FIXME: this is terrible
    Object.assign(routes, {
      ...(await clientBundle.createRouteMap()),
    })
  }
  const ui = (
    <div>
      hi
      <ExampleClientComponent />
      <ExampleClientComponent />
    </div>
  )

  let rscStream = ReactServerDOMServer.renderToReadableStream(
    { ui, ReactClientManifest },
    {
      ...ReactClientManifest,
    },
    {
      onError: console.error,
      identifierPrefix: "rsc",
    },
  )

  return new Response(rscStream, { headers: { "Content-Type": RSC_TYPE, ...noCacheHeaders } })
}

async function rscClientRender() {
  return new Response(await HTMLPageStream({ children: <RSCDemo /> }), {
    headers: { "Content-Type": "text/html", ...noCacheHeaders },
  })
}

function RSCDemo() {
  async function main(rsc_url: string) {
    const { jsxDEV } = await import("react/jsx-dev-runtime")

    console.log("running", import.meta.url)

    const React = (await import("react")).default
    const ReactDOMClient = (await import("react-dom/client")).default
    const ReactServerDOMClient = (await import("react-server-dom-webpack/client")).default

    console.log("react@" + React.version)

    const promisedResponse = fetch(new Request(rsc_url, { headers: { Accept: "text/x-component" } }))

    const { ui, ReactClientManifest: rcm } = await ReactServerDOMClient.createFromFetch<{
      ui: ReactElement
      ReactClientManifest: IReactClientManifest
    }>(promisedResponse, {
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
    })

    console.log("ReactClientManifest", rcm)
    __toy_framework__.manifest.resolve!(rcm)

    __toy_framework__.manifest.promise.then(() => {
      // console.assert(__toy_framework__.manifest.status === "fulfilled")
      // if (!(__toy_framework__.manifest.status === "fulfilled")) throw new Error("manifest not fulfilled?!")
      console.log("manifest fulfilled", __toy_framework__.manifest)
      const rscRootElement = document.getElementById("rsc-root") as HTMLDivElement
      const root = ReactDOMClient.createRoot(rscRootElement)
      root.render(ui)
    })
  }
  return (
    <>
      <h2>Howdy!</h2>
      <h3>testing RSC</h3>
      <div id="rsc-root">
        <div data-id="NOT-generated-by-client">
          pre-rendered by server in <code>{__filename.replace(__dirname, "")}</code>
        </div>
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: js`;(${main})(...${[routesForTestingRSC_use_client_paths.rsc]});` }}
      />
    </>
  )
}
