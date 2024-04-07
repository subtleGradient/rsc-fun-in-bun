import React from "react"
import ReactDOM from "react-dom"
import ReactServerDOMServer from "react-server-dom-webpack/server"

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

/** this needs to run before react-dom/server is imported */
export async function verifyReactServer() {
  const ReactInnards: ReactInnards = React as any

  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
    __SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactServerSharedInternals,
  } = ReactInnards

  // console.log({ ReactSharedInternals, ReactServerSharedInternals })

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

  // ReactServerDOMServer
  const proxy = ReactServerDOMServer.createClientModuleProxy("file://some/path/Client.tsx")

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
  const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache ?? ReactServerSharedInternals?.ReactCurrentCache
  if (!(typeof ReactCurrentCache === "object" && "current" in ReactCurrentCache))
    console.warn("ReactSharedInternals.ReactCurrentCache.current should be defined")

  if (!("ReactCurrentCache" in ReactSharedInternals)) {
    console.warn(`
      TL;DR — ReactSharedInternals.ReactCurrentCache was not defined, but I just tried to fix it for you.

      As of react@19.0.0-canary-e3ebcd54b-20240405, this is because 
      running with --conditions=react-server moves ReactCurrentCache from ReactSharedInternals to ReactServerSharedInternals.
      But (as of react-dom@19.0.0-canary-e3ebcd54b-20240405), react-dom/server expects ReactCurrentCache to be in ReactSharedInternals.
      So, ${__filename.replace(__dirname, "")} is applying a workaround to make sure ReactCurrentCache is in ReactSharedInternals also.
      `)
  }
  // adding ReactCurrentCache back to ReactSharedInternals to unbreak react-dom/server
  ReactSharedInternals.ReactCurrentCache ??= ReactCurrentCache

  const ReactDOMServer = await import("react-dom/server")
  ReactDOMServer.renderToString(React.createElement("div"))
}

// execute immediately
verifyReactServer()
