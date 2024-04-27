import Package from "#package"
import ReactNormal from "react"
const React = ReactNormal as typeof ReactNormal & ReactInnards

// https://react.dev/blog/2024/04/25/react-19-upgrade-guide#libraries-depending-on-react-internals-may-block-upgrades
const WarningSuffix19 = `_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`
const WarningSuffix18 = `_DO_NOT_USE_OR_YOU_WILL_BE_FIRED`

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

const ReactServerSharedInternalsKey18 = `__SECRET_SERVER_INTERNALS${WarningSuffix18}` as const
const ReactServerSharedInternalsKey19 = `__SECRET_SERVER_INTERNALS${WarningSuffix19}` as const
const ReactSharedInternalsKey18 = `__SECRET_INTERNALS${WarningSuffix18}` as const
const ReactSharedInternalsKey19 = `__SECRET_INTERNALS${WarningSuffix19}` as const

type ReactInnards =
  | {
      [ReactSharedInternalsKey18]?: never
      [ReactSharedInternalsKey19]: ReactSharedInternals_default | ReactSharedInternals_react_server
      [ReactServerSharedInternalsKey18]?: never
      [ReactServerSharedInternalsKey19]?: ReactServerSharedInternals
    }
  | {
      [ReactSharedInternalsKey18]: ReactSharedInternals_default | ReactSharedInternals_react_server
      [ReactSharedInternalsKey19]?: never
      [ReactServerSharedInternalsKey18]?: ReactServerSharedInternals
      [ReactServerSharedInternalsKey19]?: never
    }

/** @deprecated -- you may want {@link unbreakReactDOMServer} instead */
export async function verify() {
  await verifyReactServerDOMServer()
  await verifyReactDOMServer()
}

export async function unbreakReactDOMServer() {
  await hackReactDOMServer()
  await verifyReactDOMServer()
}

async function verifyReactServerDOMServer() {
  const ReactServerDOMServer = await import("react-server-dom-webpack/server")
  const proxy = ReactServerDOMServer.createClientModuleProxy("file://some/path/Client.tsx")
}

async function hackReactDOMServer() {
  await hack__SECRET_INTERNALS()
}

async function verifyReactDOMServer() {
  try {
    const ReactDOMServer = await import("react-dom/server")
    ReactDOMServer.renderToString(React.createElement("div"))
  } catch (error) {
    console.error("Error verifying ReactDOMServer")
    throw error
  }
}

// NOTE(@subtleGradient): I forget why I ever needed this, but here it is just in case I ever remember
async function verifyReactDOM() {
  const ReactDOM = (await import("react-dom")) as any
  const ReactDOMSharedInternals = ReactDOM[ReactSharedInternalsKey19] || ReactDOM[ReactSharedInternalsKey18]
  if (!ReactDOMSharedInternals?.ReactDOMCurrentDispatcher?.current)
    console.warn(
      `ReactDOMCurrentDispatcher.current should be defined, but it is not.
      You may need to upgrade ${__filename}`,
    )

  if ("render" in ReactDOM)
    console.warn(
      "ReactDOMServer.render should NOT be defined on the server",
      `You may need to run with --conditions=react-server or upgrade ${__filename}`,
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
async function hack__SECRET_INTERNALS() {
  if (!Package["dependencies that need hacks"]["react-dom"]) {
    console.warn("This version of react-dom does not need this hack")
    return
  }

  const { ReactSharedInternals, ReactServerSharedInternals, ReactCurrentCache } = get__SECRET_INTERNALS()

  if (!("ReactCurrentCache" in ReactSharedInternals)) {
    console.warn(`
      TL;DR — This hack should fix it. react-dom/server is broken with --conditions=react-server.

      DETAILS:
      react-dom/server expects 'ReactCurrentCache' to be in 'ReactSharedInternals'.
      But with --conditions=react-server, 'ReactCurrentCache' is in 'ReactServerSharedInternals' instead.
      So, this hack puts 'ReactCurrentCache' back into 'ReactSharedInternals' to unbreak react-dom/server.
      
      This was true as of:
        react-dom@${Package["dependencies that need hacks"]["react-dom"]} <-- a version that needed this fix
        react-dom@${Package.peerDependencies["react-dom"]} <- the version you're using
        react-dom@${(await import("react")).version} <- the version you're using

      (See ${__filename.replace(__dirname, "")} for details)
    `)
  }
  // adding ReactCurrentCache back to ReactSharedInternals to unbreak react-dom/server
  ReactSharedInternals.ReactCurrentCache ??= ReactCurrentCache
}

function get__SECRET_INTERNALS() {
  console.warn(
    `WARNING: This code (${__filename}) is using React __SECRET_INTERNALS.
    React team recommends removing any code that depends on internals.
    By using this code, upgrading React may not be possible (without changing this code).
    
    NOTE: This is a temporary workaround to 
    unbreak react-dom/server when used with --conditions=react-server.

    This is explicitly not recommended for production code.
    If you are using this in production, you should either feel smug or ashamed.
    I trust you.`,
  )
  const {
    [ReactSharedInternalsKey18]: ReactSharedInternals18,
    [ReactSharedInternalsKey19]: ReactSharedInternals19,
    [ReactServerSharedInternalsKey18]: ReactServerSharedInternals18,
    [ReactServerSharedInternalsKey19]: ReactServerSharedInternals19,
  } = React

  const ReactSharedInternals = ReactSharedInternals19 ?? ReactSharedInternals18
  const ReactServerSharedInternals = ReactServerSharedInternals19 ?? ReactServerSharedInternals18

  // react with react-server condition
  if (!(ReactServerSharedInternals && ReactSharedInternals))
    console.warn(
      // https://github.com/oven-sh/bun/issues/8990
      // https://nodejs.org/api/cli.html#-c-condition---conditionscondition
      `Expected ReactSharedInternals & ReactServerSharedInternals to be defined; 
      You may need to run with --conditions=react-server or upgrade ${__filename}`,
      {
        argv: process.argv,
        "'*INTERNALS*' in React": Object.keys(React).filter(key => key.includes("INTERNALS")),
        [ReactSharedInternalsKey18]: !!ReactSharedInternals18 ? "defined" : "undefined",
        [ReactSharedInternalsKey19]: !!ReactSharedInternals19 ? "defined" : "undefined",
        [ReactServerSharedInternalsKey18]: !!ReactServerSharedInternals18 ? "defined" : "undefined",
        [ReactServerSharedInternalsKey19]: !!ReactServerSharedInternals19 ? "defined" : "undefined",
        ReactSharedInternals,
        ReactServerSharedInternals,
      },
    )

  const ReactCurrentCache = ReactSharedInternals.ReactCurrentCache ?? ReactServerSharedInternals?.ReactCurrentCache

  if (!(typeof ReactCurrentCache === "object" && "current" in ReactCurrentCache))
    console.warn(
      `Expected ReactSharedInternals.ReactCurrentCache.current to be defined, but it was not. You may need to upgrade ${__filename}`,
    )

  return { ReactSharedInternals, ReactServerSharedInternals, ReactCurrentCache }
}
