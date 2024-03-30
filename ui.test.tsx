import { type Server } from "bun"
import { afterAll, beforeAll, describe, expect, it } from "bun:test"
import { html } from "./examples/js"
import { browser } from "./test-helpers/puppers"
import { arrayToStream } from "./util/arrayToStream"
import { concatStreams } from "./util/compoReadableStream"

/** this is probably stupid 🤷‍♂️ */
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

describe.todo("SSR", () => { })
describe.todo("with static server components", () => { })
describe.todo("with async server components", () => { })
describe.todo("with client components", () => { })
describe.todo("hydrated", () => { })

describe("pupItUp 1", async () => {
  it("works", async () => {
    using page = Object.assign(await browser.newPage(), { [Symbol.dispose]: () => page.close() })
    await page.goto("about:blank")
    // const text = await page.evaluate(() => document.body.textContent)
    // expect(text).toBe("Hello from RSC!")
    // await Bun.sleep(1000)
  })
})

describe("pupItUp 2", async () => {
  it("works", async () => {
    using page = Object.assign(await browser.newPage(), { [Symbol.dispose]: () => page.close() })
    await page.goto("about:blank")
    // const text = await page.evaluate(() => document.body.textContent)
    // expect(text).toBe("Hello from RSC!")
    // await Bun.sleep(1000)
  })
})
