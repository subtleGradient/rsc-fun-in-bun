import * as ReactDOM from "react-dom/server"

const server = Bun.serve({
  async fetch(req) {
    const url = new URL(req.url)
    if (url.pathname === "/") return home(req)
    return new Response("404", { status: 404 })
  },
})

async function home(req: Request): Promise<Response> {
  const body = (
    <main>
      <h1>Hello, world!</h1>
    </main>
  )

  const root = (
    <html>
      <head>
        <title>hi</title>
      </head>
      <body>{body}</body>
    </html>
  )

  const reactStream = await ReactDOM.renderToReadableStream(
    /** 0. injected as an html string */
    root,
    {
      signal: req.signal,

      onError(error, errorInfo) {
        console.error("ReactDOM.renderToReadableStream", error, errorInfo)
        return "An error occurred"
      },

      /** 1. injected as `<script>${bootstrapScriptContent}</script>` immediately after the react children */
      bootstrapScriptContent: "console.log('Hello from renderToReadableStream bootstrapScriptContent!')",

      /** 2.
       * <link rel=preload as=script fetchpriority=low href={bootstrapScripts[number]}> // injected in the head
       * <script async src={bootstrapScripts[number]} /> // injected at the end of the body
       */
      bootstrapScripts: [
        "bootstrapScript0.browser.js", //
        "bootstrapScript1.browser.js",
      ],

      /** 3.
       * <link rel=modulepreload fetchpriority=low href={bootstrapModules[number]}> // injected in the head
       * <script type=module src={bootstrapModules[number]} /> // injected at the end of the body
       */
      bootstrapModules: [
        "bootstrapModule0.module.js", //
        "bootstrapModule1.module.js",
      ],

      // identifierPrefix: "renderToReadableStream identifierPrefix",
      // namespaceURI: "http://www.w3.org/1999/xhtml",
      // nonce: "renderToReadableStream nonce",
      // progressiveChunkSize: 1024,
    },
  )

  const response = new Response(reactStream, {
    headers: { "Content-Type": "text/html" },
  })

  return response
}

console.log("Server running at", server.url.href)
