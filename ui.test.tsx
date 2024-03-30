import { type Server } from "bun"
import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { html, js } from "./examples/js"
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

/** this is probably bad for reasons 🤷‍♂️ */
const Port = {
  PORT: 3000,
  get next() {
    return Port.PORT++
  },
}

describe("text server", () => {
  let server: Server
  beforeAll(() => {
    port: Port.next,
      (server = Bun.serve({
        fetch(request) {
          return new Response("Hello from RSC!")
        },
      }))
  })
  afterAll(() => {
    server?.stop()
  })

  describe('GET "/"', () => {
    it("responds with 200", async () => {
      const response = await fetch(server.url.href)
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
          html`<!DOCTYPE html>`,
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

    let server: Server
    beforeAll(() => {
      server = Bun.serve({
        port: Port.next,
        async fetch(request) {
          return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
        },
      })
    })
    afterAll(() => {
      server?.stop()
    })

    describe('GET "/"', () => {
      it("responds with 200", async () => {
        const response = await fetch(server.url.href)
        expect(response.status).toBe(200)
        expect(await response.text()).toMatchSnapshot()
      })
    })
  })
})

describe.todo("server components", () => { })
describe.todo("async server components", () => { })

describe("client first (classic)", () => {
  async function htmlStream() {
    const ReactDOMServer = await import("react-dom/server")
    return concatStreams(
      arrayToStream(
        html`<!DOCTYPE html><HTML>`,
        ReactDOMServer.renderToString(
          <head>
            <title>Hello from ReactDOMServer.renderToString!</title>
          </head>
        ),
        html`<SCRIPT>${js`
          // fake commonjs environment for react-jsx-dev-runtime
          window.process = { env: { NODE_ENV: "development" } }
          window.require = (module) => {
            if (module === "react") return window.React
            if (module === "react-dom") return window.ReactDOM
            throw new Error("Unknown module: " + module)
          }
          window.exports = window
          `}</SCRIPT>`,
        html`<BODY>`,
      ),
      await ReactDOMServer.renderToReadableStream(
        <>
          <h1>Hello from ReactDOMServer.renderToReadableStream!</h1>
          <div id="root" />
          <script src="/node_modules/react/umd/react.development.js" />
          <script src="/node_modules/react-dom/umd/react-dom.development.js" />
          {/* <script src="/node_modules/react-dom/umd/react-dom-server.browser.development.js" /> */}
          {/* <script src="/node_modules/react-server-dom-webpack/umd/react-server-dom-webpack-server.browser.development.js" /> */}
          {/* <script src="/node_modules/react-server-dom-webpack/umd/react-server-dom-webpack-client.browser.development.js" /> */}
          {/* <script src="https://unpkg.com/babel-standalone@6/babel.js" /> */}
          <script src="/node_modules/react/cjs/react-jsx-dev-runtime.development.js" />
        </>,
      ),
      arrayToStream(
        html`<div id="root">loading...</div>`,
        html`<script>${js`          
          ${function main() {
            const { React, ReactDOM } = window as any as { React: typeof import("react"), ReactDOM: typeof import("react-dom/client") }
            console.log(React.version)

            function ClientComponent() {
              return <div id="generated-by-client">Hello from ClientComponent!</div>
            }

            const root = ReactDOM.hydrateRoot(document.getElementById("root")!, <ClientComponent />)
            // root.render(<ClientComponent />)
          }}
          main()
          `.trim()}</script>`,
      ),
    )
  }

  let server: Server
  beforeAll(() => {
    server = Bun.serve({
      port: Port.next,
      async fetch(request) {
        const url = new URL(request.url)

        if (url.pathname === "/") {
          return new Response(await htmlStream(), { headers: { "Content-Type": "text/html" } })
        }

        const file = Bun.file(__dirname + url.pathname)

        if (await file.exists()) {

          return new Response(file, { headers: { "Content-Type": file.type } })
          // return new Response((await Bun.build({ target: 'browser', entrypoints: [file.name!], format: 'esm' })).outputs[0], { headers: { "Content-Type": file.type } })
        }

        return new Response('404 Not Found', { status: 404 })
      },
    })
  })
  afterAll(() => {
    server?.stop()
  })

  describe("client components", () => {
    describe("render stuff on the client like it's 2014", () => {
      it("renders a component on the client (using fetch)", async () => {
        const response = await fetch(server.url.href)
        expect(response.status).toBe(200)
        // console.log(await response.text())
        expect(await response.text()).toMatchSnapshot()
      })

      it("renders a component on the client (using puppeteer)", async () => {
        await using page = await browser.newPage()
        page.pipeConsoleLogs = true

        await page.goto(server.url.href)
        const version = await page.waitForFunction(() => window?.React?.version).then((x) => x.jsonValue())
        expect(version).toStartWith("19.")
        await page.waitForSelector("#generated-by-client")
      })
    })
  })
})

describe.todo("server actions", () => { })

