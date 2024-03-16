import React from "react"
import ReactDOM from "react-dom"

type IReactServerSharedInternals = {
  ReactCurrentCache: {
    current?: {
      getCacheSignal: () => unknown
      getCacheForType: (createFetchCache: () => unknown) => unknown
    }
  }
}
export function verifyReactServer() {
  const SERVER_INTERNALS_KEY = Object.keys(React).find(key => key.includes("SERVER_INTERNALS")) ?? ""
  const ReactServerSharedInternals: IReactServerSharedInternals = (React as any)[SERVER_INTERNALS_KEY]

  console.assert(
    ReactServerSharedInternals,
    // https://github.com/oven-sh/bun/issues/8990
    // https://nodejs.org/api/cli.html#-c-condition---conditionscondition
    "ReactServerSharedInternals should be defined; You may need to run with --conditions=react-server or upgrade bun",
    {
      ReactServerSharedInternals,
      "React INTERNALS": Object.keys(React).filter(key => key.includes("INTERNALS")),
      argv: process.argv,
    },
  )

  console.assert(
    ReactDOM.render == null,
    "ReactDOMServer.render should NOT be defined on the server",
    "You may need to run with --conditions=react-server or upgrade bun",
  )
}
