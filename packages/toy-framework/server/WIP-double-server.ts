/// <reference types="bun" />

import type { Serve, Server } from "bun"

type UnixOptions = Serve & { unix: string }
type NetworkOptions<WebSocketDataType> = Omit<Serve<WebSocketDataType>, "unix">
type ServerOptions<WebSocketDataType> = NetworkOptions<WebSocketDataType> &
  UnixOptions & {
    shouldUseReactServer: (req: Request, server: Server) => Promise<{ wantsReactServer: boolean }>
  }
type UnixOptionsWithSubprocess = Awaited<ReturnType<typeof forkWithConditions>>

import { isChild, isParent, isReactServer } from "./assert-environment"

import { parseAcceptHeader } from "../util/accept"
import { forkWithConditions, getDisposableKidSock } from "./fork-ipc"

async function serveDoubleReactServer<W>(props: ServerOptions<W>): Promise<Server> {
  const { unix, fetch: fetchFn, shouldUseReactServer, ...options } = props
  const kidRef = { current: null as null | UnixOptionsWithSubprocess }

  const [unixConfig, netConfig] = [{ ...options, unix }, { ...options, unix: undefined }] // prettier-ignore
  const [thisConfig, thatServer] = isChild ? [unixConfig, netConfig] : [netConfig, unixConfig]

  const thisServer = Bun.serve({
    ...thisConfig,

    async fetch(req, thisServer) {
      const { wantsReactServer } = await shouldUseReactServer.call(this, req, thisServer)
      if (wantsReactServer != isReactServer) {
        const { unix, onmessageRef, subprocess } = kidRef.current!
        console.log("established connection to", subprocess.pid, unix)
        return await fetch(req.url, {
          ...req,

          // https://bun.sh/guides/http/fetch-unix
          // @ts-expect-error -- missing types for unix option
          unix,
        })
      }

      return (await fetchFn.call(this, req, thisServer)) || new Response("no response", { status: 404 })
    },
  })

  kidRef.current = await forkWithConditions({
    entrypoint: __filename,
    unix: thisServer.url.pathname,
    conditions: { "react-server": !isReactServer },
  })

  return thisServer
}

if (import.meta.main) {
  const doubleServer = await serveDoubleReactServer({
    port: isReactServer ? 3880 : 3881,
    // normally you wouldn't have a separate unix setting for parent and child servers
    unix: isParent ? "let the child process decide" : getDisposableKidSock().sock,

    async fetch(request, server) {
      return Response.json({ isChild, isReactServer })
    },

    async shouldUseReactServer(request) {
      const acceptsRSC = !!parseAcceptHeader(request.headers.get("Accept")).find(({ type }) => type == "text/x-component")
      const url = new URL(request.url)
      const rsc = url.searchParams.get("rsc")
      const conditions = url.searchParams.getAll("conditions")
      const wantsReactServer = acceptsRSC || conditions.includes("react-server") || rsc === "1"
      return { wantsReactServer }
    },
  })

  console.log(isParent ? "parent" : "child ", isReactServer ? "    react-server" : "NOT react-server", doubleServer.url.href)
  if (isParent) console.log("           react-server", doubleServer.url.href + "?rsc=1")
  if (isParent) console.log("           react-server", doubleServer.url.href + "?rsc=0")
}
