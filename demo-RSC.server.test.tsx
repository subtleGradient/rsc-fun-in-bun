import { type Server } from "bun"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "bun:test"
import { ImportMapCustom } from "./examples/ImportMap_fromPackage"
import { html, js, tsx } from "./examples/js"
import { browser } from "./test-helpers/puppers"
import { arrayToStream } from "./util/arrayToStream"
import { concatStreams } from "./util/compoReadableStream"

if (!1!) {
  describe("the `await using` keyword", async () => {
    it("disposes of the page auto-magically", async () => {
      await using page = Object.assign(await browser.newPage(), { [Symbol.asyncDispose]: () => page.close() })
      await page.goto("about:blank")
      // no need to call page.close() here! 🤯
    })
  })
}

const serverRef = { current: null as null | Server }
const fetchRef = { current: null as null | Server["fetch"] }

beforeAll(() => {
  fetchRef.current = request => {
    return new Response("Hello from RSC!")
  }
  serverRef.current = Bun.serve({
    fetch(request) {
      return fetchRef.current!.call(this, request)
    },
  })
})
afterEach(() => (fetchRef.current = null))
afterAll(() => {
  serverRef.current?.stop()
  serverRef.current = null
})

describe("text server", () => {
  describe('GET "/"', () => {
    it("responds with 200", async () => {
      const response = await fetch(serverRef.current!.url.href)
      expect(response.status).toBe(200)
      expect(await response.text()).toBe("Hello from RSC!")
    })
  })
})

describe("HTML server", () => {
  describe("react-dom/server", () => {
    async function htmlStream() {
      const ReactDOMServer = await import("react-dom/server")
      return concatStreams(
        arrayToStream(
          html`<!doctype html>`,
          `\n<HTML>\n`,
          ReactDOMServer.renderToString(
            <>
              <head>
                <title>Hello from ReactDOMServer.renderToString!</title>
              </head>
            </>,
          ),
          `\n<BODY>\n`,
        ),
        await ReactDOMServer.renderToReadableStream(
          <>
            <h1>Hello from ReactDOMServer.renderToReadableStream!</h1>
            <div id="root" />
            {/* <script type="module" src="/examples/client-bootstrap.js" /> */}
          </>,
        ),
        arrayToStream(
          "\n<!-- ahoy! -->\n",
          html`<script>
            console.log("Hello from RSC!")
          </script>`,
        ),
      )
    }

    beforeEach(() => {
      fetchRef.current = async function fetch(request) {
        return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
      }
    })

    describe('GET "/"', () => {
      it("responds with 200", async () => {
        const response = await fetch(serverRef.current!.url.href)
        expect(response.status).toBe(200)
        expect(await response.text()).toMatchSnapshot()
      })
    })
  })
})

describe("client first (classic)", () => {
  async function htmlStream() {
    const ReactDOMServer = await import("react-dom/server")
    return concatStreams(
      arrayToStream(
        html`<!doctype html>
          <html></html>`,
        ReactDOMServer.renderToString(
          <head>
            <title>Hello from ReactDOMServer.renderToString!</title>
          </head>,
        ),
        html`<script>
          ${js`
          // fake commonjs environment for react-jsx-dev-runtime
          window.process = { env: { NODE_ENV: "development" } }
          window.require = (module) => {
            if (module === "react") return window.React
            if (module === "react-dom") return window.ReactDOM
            throw new Error("Unknown module: " + module)
          }
          window.exports = window
          `}
        </script>`,
        html`<body></body>`,
      ),
      await ReactDOMServer.renderToReadableStream(
        <>
          <h1>Hello from ReactDOMServer.renderToReadableStream!</h1>
          <div id="root" />
          <script src="/node_modules/react/umd/react.development.js" />
          <script src="/node_modules/react-dom/umd/react-dom.development.js" />
          {/* <script src="/node_modules/react-dom/umd/react-dom-serverRef.current!.browser.development.js" /> */}
          {/* <script src="/node_modules/react-server-dom-webpack/umd/react-server-dom-webpack-serverRef.current!.browser.development.js" /> */}
          {/* <script src="/node_modules/react-server-dom-webpack/umd/react-server-dom-webpack-client.browser.development.js" /> */}
          {/* <script src="https://unpkg.com/babel-standalone@6/babel.js" /> */}
          <script src="/node_modules/react/cjs/react-jsx-dev-runtime.development.js" />
        </>,
      ),
      arrayToStream(
        html`<div id="root">loading...</div>`,
        html`<script>
          ${js`          
          ${function main() {
            const { React, ReactDOM } = window as any as {
              React: typeof import("react")
              ReactDOM: typeof import("react-dom/client")
            }
            console.log(React.version)

            function ClientComponent() {
              return <div id="generated-by-client">Hello from ClientComponent!</div>
            }

            const root = ReactDOM.hydrateRoot(document.getElementById("root")!, <ClientComponent />)
            // root.render(<ClientComponent />)
          }}
          main()
          `.trim()}
        </script>`,
      ),
    )
  }

  beforeEach(() => {
    fetchRef.current = async function fetch(request) {
      const url = new URL(request.url)

      if (url.pathname === "/") {
        return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
      }

      const file = Bun.file(__dirname + url.pathname)

      if (await file.exists()) {
        return new Response(file, { headers: { "Content-Type": file.type } })
        // return new Response((await Bun.build({ target: 'browser', entrypoints: [file.name!], format: 'esm' })).outputs[0], { headers: { "Content-Type": file.type } })
      }

      return new Response("404 Not Found", { status: 404 })
    }
  })

  describe("client components", () => {
    describe("render stuff on the client like it's 2014", () => {
      it("renders a component on the client (using fetch)", async () => {
        const response = await fetch(serverRef.current!.url.href)
        expect(response.status).toBe(200)
        // console.log(await response.text())
        expect(await response.text()).toMatchSnapshot()
      })

      it("renders a component on the client (using puppeteer)", async () => {
        await using page = await browser.newPage()
        page.pipeConsoleLogs = true

        await page.goto(serverRef.current!.url.href)
        const version = await page.waitForFunction(() => window?.React?.version).then(x => x.jsonValue())
        expect(version).toStartWith("19.")
        await page.waitForSelector("#generated-by-client")
      })
    })
  })
})

describe("client first (modules)", () => {
  async function htmlStream() {
    const ReactDOMServer = await import("react-dom/server")
    return concatStreams(
      arrayToStream(
        html`<!doctype html>
          <html></html>`,
        ReactDOMServer.renderToString(
          <head>
            <title>Hello from ReactDOMServer.renderToString!</title>
            {/* <ImportMap_fromPackage /> */}
            {await ImportMapCustom()}
          </head>,
        ),
      ),
      await ReactDOMServer.renderToReadableStream(
        <>
          <h1>Hello from ReactDOMServer.renderToReadableStream!</h1>
          <div id="root" />
        </>,
      ),
      arrayToStream(
        html`<div id="root">loading...</div>`,
        html`<script type="module">
          ${await new Bun.Transpiler({ target: "browser" }).transform(tsx`
        
        import JSX from "react/jsx-dev-runtime"
        const { jsxDEV, Fragment } = JSX
        import React from "react"
        import ReactDOM from "react-dom/client"
        
        console.log(React.version)
        console.log(jsxDEV)

        Object.assign(window, { React, ReactDOM, jsxDEV, Fragment })


        function main() {
          function ClientComponent() {
            return <div id="generated-by-client">Hello from ClientComponent!</div>
          }

          const root = ReactDOM.hydrateRoot(document.getElementById("root"), <ClientComponent />)
        }

        main()

        `)}
        </script>`,
      ),
    )
  }

  beforeEach(() => {
    fetchRef.current = async function fetch(request) {
      const url = new URL(request.url)

      if (url.pathname === "/") {
        return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
      }

      const file = Bun.file(__dirname + url.pathname)
      if (await file.exists()) {
        // return new Response(file, { headers: { "Content-Type": file.type } })
        return new Response((await Bun.build({ target: "browser", entrypoints: [file.name!], format: "esm" })).outputs[0], {
          headers: { "Content-Type": file.type },
        })
      }

      return new Response("404 Not Found", { status: 404 })
    }
  })

  describe("client components", () => {
    describe("render stuff on the client like it's 2014", () => {
      it("renders a component on the client (using fetch)", async () => {
        const response = await fetch(serverRef.current!.url.href)
        expect(response.status).toBe(200)
        // console.log(await response.text())
        expect(await response.text()).toMatchSnapshot()
      })

      it(
        "renders a component on the client (using puppeteer)",
        async () => {
          await using page = await browser.newPage()
          page.pipeConsoleLogs = true

          await page.goto(serverRef.current!.url.href)
          const version = await page.waitForFunction(() => window.React?.version).then(x => x.jsonValue())
          expect(version).toStartWith("19.")
          debugger
          await page.waitForSelector("#generated-by-client", { timeout: Number.MAX_SAFE_INTEGER })
          // await Bun.sleep(Number.MAX_SAFE_INTEGER)
        },
        { timeout: Number.MAX_SAFE_INTEGER },
      )
    })
  })
})

describe("RSC (React Server Components) — with fetch, no SSR, no hydration", () => {
  const globals = { __webpack_require__: js`Object.assign(function __webpack_require__(){}, { u: null })` }

  const clientBundleEntryPoint: Partial<ReturnType<typeof Bun.file>> = {
    name: "/generated-on-the-fly/clientBundleEntryPoint.mjs",
    type: "text/javascript",

    async text() {
      const code = tsx`
/// <reference lib="dom" />

import React from "react"
import JSX from "react/jsx-dev-runtime"
import ReactDOM from "react-dom/client"
import * as ReactServerDOMClient from "react-server-dom-webpack/client"
import * as ReactServerDOMServer from "react-server-dom-webpack/serverRef.current!.browser"

console.log(React.version)

const { jsxDEV, Fragment } = JSX
// Object.assign(window, { React, ReactDOM, jsxDEV, Fragment })

function ClientComponent() {
  return <div id="generated-by-client">Hello from ClientComponent!</div>
}

const root = ReactDOM.hydrateRoot(document.getElementById("root"), <ClientComponent />)
`
      return await new Bun.Transpiler({ target: "browser", define: globals }).transform(code)
    },
  }

  async function htmlStream() {
    const ReactDOMServer = await import("react-dom/server")
    return concatStreams(
      arrayToStream(html`<!doctype html>`),
      await ReactDOMServer.renderToReadableStream(
        <html>
          <head>
            <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
            <ImportMapCustom />
          </head>
          <body>
            <h1>Hello from {__filename.replace(__dirname, "")}</h1>
            <div id="root" />
            <script type="module" src={clientBundleEntryPoint.name} />
          </body>
        </html>,
      ),
    )
  }

  beforeEach(() => {
    fetchRef.current = async function fetch(request) {
      const url = new URL(request.url)

      if (url.pathname === "/") {
        return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
      }

      if (url.pathname === clientBundleEntryPoint.name) {
        return new Response(await clientBundleEntryPoint.text!(), {
          headers: { "Content-Type": clientBundleEntryPoint.type! },
        })
      }

      const file = Bun.file(__dirname + url.pathname)
      if (await file.exists()) {
        // return new Response(file, { headers: { "Content-Type": file.type } })
        return new Response(
          (await Bun.build({ format: "esm", target: "browser", define: globals, entrypoints: [file.name!] })).outputs[0],
          { headers: { "Content-Type": file.type } },
        )
      }

      return new Response("404 Not Found", { status: 404 })
    }
  })

  describe("client components", () => {
    describe("render stuff on the client like it's 2014", () => {
      it("renders a component on the client (using fetch)", async () => {
        const response = await fetch(serverRef.current!.url.href)
        expect(response.status).toBe(200)
        // console.log(await response.text())
        // expect(await response.text()).toMatchSnapshot()
      })

      it.todo(
        "renders a component on the client (using puppeteer)",
        async () => {
          await using page = await browser.newPage()
          page.pipeConsoleLogs = true

          await page.goto(serverRef.current!.url.href)

          const version = await page.waitForFunction(() => window.React?.version).then(x => x.jsonValue())
          expect(version).toStartWith("19.")
          await page.waitForSelector("#generated-by-client", { timeout: Number.MAX_SAFE_INTEGER })
          // await Bun.sleep(Number.MAX_SAFE_INTEGER)
        },
        { timeout: Number.MAX_SAFE_INTEGER },
      )
    })
  })
})

describe.todo("server components", () => {})
describe.todo("async server components", () => {})
describe.todo("server actions", () => {})
