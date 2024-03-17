import React from "react"
import ReactDOM from "react-dom"
import * as RSDWServer from "react-server-dom-webpack/server"

type IReactServerSharedInternals = {
  ReactCurrentCache: {
    current?: {
      getCacheSignal: () => unknown
      getCacheForType: (createFetchCache: () => unknown) => unknown
    }
  }
}
export function verifyReactServer() {
  const ReactSharedInternals = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  const ReactServerSharedInternals: IReactServerSharedInternals = (React as any)
    .__SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

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

  const ReactDOMSharedInternals = (ReactDOM as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (!ReactDOMSharedInternals?.ReactDOMCurrentDispatcher?.current)
    console.warn("ReactDOMCurrentDispatcher.current should be defined")

  if (ReactDOM.render != null)
    console.warn(
      "ReactDOMServer.render should NOT be defined on the server",
      "You may need to run with --conditions=react-server or upgrade bun",
    )

  const proxy = RSDWServer.createClientModuleProxy("file://some/path/Client.tsx")

  const ReactCurrentCache = ReactSharedInternals?.ReactCurrentCache
  if (!ReactCurrentCache?.current) console.warn("ReactCurrentCache.current.getCacheSignal should be defined")
}
