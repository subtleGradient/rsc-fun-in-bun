/// <reference types="bun" />

import type { Serve, Server } from "bun"

type UnixOptions = Serve & { unix: string }
type NetworkOptions<WebSocketDataType> = Omit<Serve<WebSocketDataType>, "unix">
type ServerOptions<WebSocketDataType> = NetworkOptions<WebSocketDataType> &
  UnixOptions & {
    shouldUseReactServer: (req: Request, server: Server) => Promise<{ wantsReactServer: boolean }>
    fetchWithReactServer: (req: Request, server: Server) => Promise<Response>
  }
type UnixOptionsWithSubprocess = Awaited<ReturnType<typeof forkWithConditions>>

import { assert, isChild, isNotReactServer, isParent, isReactServer } from "./assert-environment"

import { parseAcceptHeader } from "../util/accept"
import { forkWithConditions, getDisposableKidSock } from "./fork-ipc"

async function serveDoubleReactServer<W>(props: ServerOptions<W>): Promise<Server> {
  const { unix, fetch: fetchSSR, fetchWithReactServer: fetchRSC, shouldUseReactServer, ...options } = props
  const kidRef = { current: null as null | UnixOptionsWithSubprocess }

  const [unixConfig, netConfig] = [{ ...options, unix }, options]
  const thisConfig = isChild ? unixConfig : netConfig

  kidRef.current = await forkWithConditions({
    unix,
    entrypoint: __filename,
    conditions: { "react-server": isNotReactServer },
  })

  return Bun.serve({
    ...thisConfig,

    async fetch(req, thisServer) {
      const { wantsReactServer } = await shouldUseReactServer.call(this, req, thisServer)
      if (wantsReactServer !== isReactServer) {
        const { unix, onmessageRef, subprocess } = kidRef.current!
        return await fetch(req.url, {
          ...req,

          // https://bun.sh/guides/http/fetch-unix
          // @ts-expect-error -- missing types for unix option
          unix,
        })
      }
      assert(wantsReactServer === isReactServer)
      const fetchFn = wantsReactServer ? fetchRSC : fetchSSR
      return (await fetchFn.call(this, req, thisServer)) || new Response("no response", { status: 404 })
    },
  })
}

if (import.meta.main) {
  if (isParent) console.log(__filename)

  async function shouldUseReactServer(request: Request) {
    const url = new URL(request.url)
    const rsc = url.searchParams.get("rsc")
    const conditions = url.searchParams.getAll("conditions")
    const acceptsRSC = !!parseAcceptHeader(request.headers.get("Accept")).find(({ type }) => type == "text/x-component")
    const wantsReactServer = acceptsRSC || conditions.includes("react-server") || rsc === "1"
    return { wantsReactServer }
  }

  const doubleServer = await serveDoubleReactServer({
    port: isReactServer ? 3880 : 3881,

    unix: isParent ? "let the child process decide" : getDisposableKidSock().sock,

    shouldUseReactServer,

    async fetch(request, server) {
      const ReactDOMServer = await import("react-dom/server")
      const htmlStream = await ReactDOMServer.renderToReadableStream(<h1>hi from ReactDOMServer</h1>)
      return new Response(htmlStream, { headers: { "Content-Type": "text/html" } })
    },

    async fetchWithReactServer(request, server) {
      const ReactServerDOMServer = await import("react-server-dom-webpack/server.edge")
      const ui = <h1>hi from react-server</h1>
      const rsc = ReactServerDOMServer.renderToReadableStream({ ui }, {})
      return new Response(rsc, { headers: { "Content-Type": "text/x-component" } })
    },
  })

  console.log(isParent ? "parent" : "child ", isReactServer ? "    react-server" : "NOT react-server", doubleServer.url.href)
  if (isParent) console.log("           react-server", doubleServer.url.href + "?rsc=1")
  if (isParent) console.log("           react-server", doubleServer.url.href + "?rsc=0")
}
