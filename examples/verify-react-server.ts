import React from "react"
import ReactDOM from "react-dom"
import * as RSDWServer from "react-server-dom-webpack/server"

type ReactCurrentCache = {
  current: null | {
    getCacheSignal: () => unknown
    getCacheForType: (createFetchCache: () => unknown) => unknown
  }
}

type ReactSharedInternals_OG = {
  ReactCurrentCache: ReactCurrentCache
}
type ReactSharedInternals_react_server = {
  ReactCurrentCache: undefined
}
type ReactServerSharedInternals = {
  ReactCurrentCache: ReactCurrentCache
}

type ReactInnards = {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals_OG | ReactSharedInternals_react_server
  __SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: ReactServerSharedInternals
}

export async function verifyReactServer() {
  const ReactInnards: ReactInnards = React as any

  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
    __SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactServerSharedInternals,
  } = ReactInnards

  // react with react-server condition
  if (!ReactServerSharedInternals)
    console.warn(
      // https://github.com/oven-sh/bun/issues/8990
      // https://nodejs.org/api/cli.html#-c-condition---conditionscondition
      "ReactServerSharedInternals should be defined; You may need to run with --conditions=react-server or upgrade bun",
      {
        ReactServerSharedInternals,
        "React INTERNALS": Object.keys(React).filter(key => key.includes("INTERNALS")),
        argv: process.argv,
      },
    )

  // RSDWServer
  const proxy = RSDWServer.createClientModuleProxy("file://some/path/Client.tsx")

  // ReactDOM
  const ReactDOMSharedInternals = (ReactDOM as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (!ReactDOMSharedInternals?.ReactDOMCurrentDispatcher?.current)
    console.warn("ReactDOMCurrentDispatcher.current should be defined")

  if (ReactDOM.render != null)
    console.warn(
      "ReactDOMServer.render should NOT be defined on the server",
      "You may need to run with --conditions=react-server or upgrade bun",
    )

  // ReactDOMServer
  console.log("ReactDOMServer.renderToString")
  const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache ?? ReactServerSharedInternals?.ReactCurrentCache
  ReactSharedInternals.ReactCurrentCache ??= ReactCurrentCache
  if (!(typeof ReactCurrentCache === "object" && "current" in ReactCurrentCache))
    console.warn("ReactSharedInternals.ReactCurrentCache.current should be defined")

  const ReactDOMServer = await import("react-dom/server")

  ReactDOMServer.renderToString(React.createElement("div"))
  // console.log("ReactDOMServer.renderToReadableStream")
  // ReactDOMServer.renderToReadableStream(React.createElement("div"))
}
