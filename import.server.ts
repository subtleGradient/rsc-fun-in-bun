// Bun server that routes all requests to import

import { isPromiseLike } from "./util/isPromiseLike"

enum ContentType {
  HTML = "text/html",
  CSS = "text/css",
  JS = "application/javascript",
  JSON = "application/json",
  TEXT = "text/plain",
  BINARY = "application/octet-stream",
  FORM = "application/x-www-form-urlencoded",
  MULTIPART = "multipart/form-data",
  RSC = "application/vnd.react-server-component",
}

function guessContentType_fromRequest(request: Request): ContentType {
  // TODO: do something smart with the Accept header?
  // const accept = parseAcceptHeader(request.headers.get("Accept"))
  const url = new URL(request.url)
  const ext = url.pathname.split(".").pop()
  if (ext === "js") return ContentType.JS
  if (ext === "json") return ContentType.JSON
  if (ext === "css") return ContentType.CSS
  if (ext === "html") return ContentType.HTML
  return ContentType.BINARY
}

type Config = {
  parent: string
}

async function handleRequestUsingImport(config: Config, request: Request) {
  // TODO: initialize stuff here maybe
  if (process.env.NODE_ENV === "production") throw new Error("this is a toy. It's not designed for production")

  const url = new URL(request.url)
  const moduleId = await import.meta.resolve(`.${url.pathname}`, config.parent)
  const module = await import(moduleId)
  return await responseFromUnknown(request, module.default)
}

async function responseFromUnknown(request: Request, result: unknown): Promise<Response> {
  if (isPromiseLike(result)) result = await result
  if (typeof result === "function") result = await result(request)
  if (result instanceof Response) return result
  if (typeof result === "string")
    return new Response(result, { headers: { "Content-Type": guessContentType_fromRequest(request) } })
  if (result instanceof ReadableStream)
    return new Response(result, { headers: { "Content-Type": guessContentType_fromRequest(request) } })
  if (result instanceof ArrayBuffer)
    return new Response(result, { headers: { "Content-Type": guessContentType_fromRequest(request) } })
  if (result instanceof Blob)
    return new Response(result, { headers: { "Content-Type": guessContentType_fromRequest(request) } })

  throw new TypeError("Unknown result type")
}

if (import.meta.main) {
  const fetch = handleRequestUsingImport.bind(null, { parent: import.meta.url })
  const server = Bun.serve({ fetch })
  console.log("Server running at", server.url.href)
}
