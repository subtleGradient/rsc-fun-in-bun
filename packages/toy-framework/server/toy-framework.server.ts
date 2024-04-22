import type { Pathname, RouteMap } from "../types"
import { clientEntryPointBundle } from "./clientEntryPointBundle"
import { externalsBundle } from "./externalsBundle"
import { noCacheHeaders } from "./headers"
import { HTMLPageStream } from "./HTMLPageStream"
import { polyfillsAndStuff } from "./polyfillsAndStuff"

/** @deprecated -- use {@link ToyFramework} instead */
export const routes: RouteMap = {
  "/favicon.ico": async () => new Response("i dunno bro 🤷‍♂️", { status: 404 }),

  "/": async () =>
    new Response(await HTMLPageStream({}), {
      headers: { "Content-Type": "text/html", ...noCacheHeaders },
    }),

  [polyfillsAndStuff.name!]: async () =>
    new Response(await polyfillsAndStuff.text(), {
      headers: { "Content-Type": polyfillsAndStuff.type!, ...noCacheHeaders },
    }),

  ...(await externalsBundle.createRouteMap()),
  ...(await clientEntryPointBundle.createRouteMap()),
}

/** @deprecated -- use {@link ToyFramework} instead */
export async function fetch(request: Request): Promise<Response> {
  const url = new URL(request.url)
  console.warn(request.method, url.href)

  if (url.pathname in routes) return await routes[url.pathname as Pathname](request)

  return new Response("404 Not Found", { status: 404 })
}

/** TODO: think of something smart to do here */
function ToyFramework() {}

if (import.meta.main) {
  throw new Error("This module is not meant to be run as a script. Try running the main module instead. See package.json")
}
