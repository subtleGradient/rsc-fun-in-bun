import Package from "#package"
import ReactNormal from "react"
const React = ReactNormal as typeof ReactNormal & ReactInnards

type ReactCurrentCache = {
  current: null | {
    getCacheSignal: () => unknown
    getCacheForType: (createFetchCache: () => unknown) => unknown
  }
}

type ReactSharedInternals_default = {
  ReactCurrentCache: ReactCurrentCache
}
type ReactSharedInternals_react_server = {
  ReactCurrentCache: undefined
}
type ReactServerSharedInternals = {
  ReactCurrentCache: ReactCurrentCache
}

type ReactInnards = {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals_default | ReactSharedInternals_react_server
  __SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED?: ReactServerSharedInternals
}

/** this needs to run before react-dom/server is imported */
export async function verify() {
  await verifyReactServerDOMServer()
  await hack__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED()
  await verifyReactDOMServer()
}

async function verifyReactServerDOMServer() {
  const ReactServerDOMServer = await import("react-server-dom-webpack/server")
  const proxy = ReactServerDOMServer.createClientModuleProxy("file://some/path/Client.tsx")
}

async function hackReactDOMServer() {}

async function verifyReactDOMServer() {
  const ReactDOMServer = await import("react-dom/server")
  ReactDOMServer.renderToString(React.createElement("div"))
}

async function verifyReactDOM() {
  const ReactDOM = await import("react-dom")
  const ReactDOMSharedInternals = (ReactDOM as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
  if (!ReactDOMSharedInternals?.ReactDOMCurrentDispatcher?.current)
    console.warn("ReactDOMCurrentDispatcher.current should be defined")

  if (ReactDOM.render != null)
    console.warn(
      "ReactDOMServer.render should NOT be defined on the server",
      "You may need to run with --conditions=react-server or upgrade bun",
    )
}

/**
 * This is a terrible idea. Definitely don't do this.
 * Unless... you want {@link ReactDOMServer} to work with --conditions=react-server today,
 * then I guess you can do whatever you want.
 * I'm not your mom.
 *
 * But don't blame me when this definitely breaks in the future :P
 */
async function hack__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
  if (!Package["dependencies that need hacks"]["react-dom"]) {
    console.warn("This version of react-dom does not need this hack")
    return
  }

  const { ReactSharedInternals, ReactServerSharedInternals, ReactCurrentCache } =
    get__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED()

  if (!("ReactCurrentCache" in ReactSharedInternals)) {
    console.warn(`
      TL;DR — react-dom/server is broken with --conditions=react-server. But this hack should fix it.
      See ${__filename.replace(__dirname, "")} for details.

      DETAILS:
      react-dom/server expects 'ReactCurrentCache' to be in 'ReactSharedInternals'.
      But with --conditions=react-server, 'ReactCurrentCache' is in 'ReactServerSharedInternals' instead.
      So, this hack puts 'ReactCurrentCache' back into 'ReactSharedInternals' to unbreak react-dom/server.
      
      This was true as of:
        react-dom@${Package["dependencies that need hacks"]["react-dom"]} <-- a version that needed this fix
        react-dom@${Package.peerDependencies["react-dom"]} <- the version you're using
      `)
  }
  // adding ReactCurrentCache back to ReactSharedInternals to unbreak react-dom/server
  ReactSharedInternals.ReactCurrentCache ??= ReactCurrentCache
}

function get__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED() {
  const {
    __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
    __SECRET_SERVER_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactServerSharedInternals,
  } = React

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

  const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache ?? ReactServerSharedInternals?.ReactCurrentCache

  if (!(typeof ReactCurrentCache === "object" && "current" in ReactCurrentCache))
    console.warn("ReactSharedInternals.ReactCurrentCache.current should be defined")

  return { ReactSharedInternals, ReactServerSharedInternals, ReactCurrentCache }
}
