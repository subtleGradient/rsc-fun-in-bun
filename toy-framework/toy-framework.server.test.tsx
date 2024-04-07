import { type Server } from "bun"
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from "bun:test"
import { browser } from "../test-helpers/puppers"

if (!1!) {
  describe("the `await using` keyword", async () => {
    it("disposes of the page auto-magically", async () => {
      await using page = await browser.newPage()
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
    async fetch(request: Request): Promise<Response> {
      return await fetchRef.current!.call(this, request)
    },
  })
})
afterEach(() => (fetchRef.current = null))
afterAll(() => {
  serverRef.current?.stop()
  serverRef.current = null
})

describe("toy-framework.server", async () => {
  const toyFramework = await import("./toy-framework.server.tsx")
  beforeEach(() => (fetchRef.current = toyFramework.fetch))
  afterEach(() => (fetchRef.current = null))
  describe("toy-framework.server", () => {
    describe("root / route", () => {
      it("returns a response", async () => {
        const response = await fetchRef.current!(new Request(serverRef.current!.url.href))
        expect(response.status).toBe(200)
        expect((await response.text()).replaceAll("><", ">\n<")).toMatchSnapshot()
      })

      it("renders ClientComponent", async () => {
        await using page = await browser.newPage()
        page.goto(serverRef.current!.url.href)
        await page.waitForSelector("#generated-by-client")
        expect(await page.$eval("#generated-by-client", el => el.textContent)).toBe("Hello from ClientComponent!")
      })
    })
  })
})
