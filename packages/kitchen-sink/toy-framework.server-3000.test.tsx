/// <reference lib="dom" />
import { describe, expect, it } from "bun:test"
import { routesForTestingRSC_use_client_paths } from "./routesForTestingRSC_use_client_paths.tsx"
import { browser } from "./test-helpers/puppers.ts"

const ROOT_DIRNAME = __dirname.split("/").slice(0, -2).join("/")
const RSC_TYPE = "text/x-component"

try {
  // trigger the tests to re-run when this file changes

  // BUG: Bun@1.1.4 does not support --conditions yet https://github.com/oven-sh/bun/issues/10036
  // So, I'm using a dynamic import below to avoid triggering the react-server error
  await import("./kitchen-sink.ts")
} catch (error) {}

if (!1!) {
  describe("the `await using` keyword", async () => {
    it("disposes of the page auto-magically", async () => {
      await using page = await browser.newPage()
      await page.goto("about:blank")
      // no need to call page.close() here! 🤯
    })
  })
}

describe("toy-framework.server", () => {
  describe("root / route", () => {
    it("returns a response", async () => {
      const response = await fetch(new Request(`http://localhost:3000`))
      expect(response.status).toBe(200)
      expect((await response.text()).replaceAll("><", ">\n<")).toMatchSnapshot()
    })

    it("renders ClientComponent", async () => {
      console.time("browser.newPage")
      await using page = await browser.newPage()
      console.timeEnd("browser.newPage")
      page.goto(`http://localhost:3000`)
      await page.waitForSelector("#generated-by-client")
      expect(await page.$eval("#generated-by-client", el => el.textContent)).toBe("Hello from ClientComponent!")
    })
  })

  describe("/rsc/test-suspense", () => {
    it("returns RSC content", async () => {
      const response = await fetch(new Request(`http://localhost:3000/rsc/test-suspense`, { headers: { Accept: RSC_TYPE } }))
      expect(response.status).toBe(200)
      expect(await response.text()).toMatchSnapshot()
    })
    it(
      "updates asynchronously",
      async done => {
        const rscResponse = await fetch(
          new Request(`http://localhost:3000/rsc/test-suspense`, { headers: { Accept: RSC_TYPE } }),
        )
        // stream the responce and verify that it sends multiple chunks
        const decoder = new TextDecoder()
        const reader = rscResponse.body!.getReader()
        reader.closed.then(done)
        let count = 0
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          // expect(decoder.decode(value)).toMatchSnapshot()
          count++
        }
        expect(count).toBeGreaterThan(1)
      },
      { retry: 3 },
    )
  })

  describe("/rsc/test-suspense-render", () => {
    it("returns RSC content", async () => {
      const response = await fetch(new Request(`http://localhost:3000/rsc/test-suspense-render`))
      expect(response.status).toBe(200)
      expect(await response.text().then(text => text.replaceAll("><", ">\n<"))).toMatchSnapshot()
    })

    it("renders ClientComponent", async () => {
      console.time("browser.newPage")
      await using page = await browser.newPage()
      console.timeEnd("browser.newPage")

      console.time("page.goto")
      await page.goto(`http://localhost:3000/rsc/test-suspense-render`)
      console.timeEnd("page.goto")

      console.time("page.waitForSelector body")
      await page.waitForSelector("body")
      console.timeEnd("page.waitForSelector body")

      console.time("page.waitForSelector 0")
      await page.waitForSelector("#AsyncView0")
      console.timeEnd("page.waitForSelector 0")

      console.time("page.waitForSelector 10")
      await page.waitForSelector("#AsyncView10")
      console.timeEnd("page.waitForSelector 10")

      console.time("page.$eval")
      expect(await page.$eval("#AsyncView10", el => el.textContent)).toMatch(/slept for 10ms/)
      console.timeEnd("page.$eval")
    })
  })

  describe(routesForTestingRSC_use_client_paths.render, () => {
    const rsc_url = `http://localhost:3000${routesForTestingRSC_use_client_paths.rsc}`
    const render_url = `http://localhost:3000${routesForTestingRSC_use_client_paths.render}`

    it("exists", async () => {
      expect((await fetch(rsc_url)).status).toBe(200)
      expect((await fetch(render_url)).status).toBe(200)
    })

    describe("RSC payload", () => {
      it("mentions ClientComponent by name", async () => {
        const response = await fetch(rsc_url)
        const rscText = await response.text()
        expect(rscText).toMatch("ExampleClientComponent")
        expect(rscText).toMatch("examples/example0.client")
      })

      it("should not include absolute paths", async () => {
        const response = await fetch(rsc_url)
        const rscText = await response.text()

        try {
          // await import("#toy-framework/plugins/useClient_fromServer.plugin.ts")
        } catch (error) {}

        expect(rscText).not.toMatch(ROOT_DIRNAME) // no absolute paths
      })
    })

    it.todo("renders ClientComponent", async () => {
      console.time("browser.newPage")
      await using page = await browser.newPage()
      console.timeEnd("browser.newPage")

      console.time("page.goto")
      await page.goto(rsc_url)
      console.timeEnd("page.goto")

      console.time("page.waitForSelector body")
      await page.waitForSelector("body")
      console.timeEnd("page.waitForSelector body")

      console.time("page.waitForSelector #ClientComponent")
      await page.waitForSelector("#ClientComponent")
      console.timeEnd("page.waitForSelector #ClientComponent")

      console.time("page.$eval")
      expect(await page.$eval("#ClientComponent", el => el.textContent)).toBe("Hello from ClientComponent!")
      console.timeEnd("page.$eval")
    })
  })
})
