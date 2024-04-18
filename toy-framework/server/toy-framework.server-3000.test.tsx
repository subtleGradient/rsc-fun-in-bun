import { browser } from "@/test-helpers/puppers.ts"
import { describe, expect, it } from "bun:test"

const RSC_TYPE = "text/x-component"

if (!1!) {
  // trigger the tests to re-run when this file changes
  // const toyFramework = await import("./toy-framework.server.tsx")
  const toyFramework = require("./toy-framework.server.tsx")

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
      await using page = await browser.newPage()
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
    it("updates asynchronously", async done => {
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
      await using page = await browser.newPage()
      page.goto(`http://localhost:3000/rsc/test-suspense-render`)
      await page.waitForSelector("#AsyncView10")
      expect(await page.$eval("#AsyncView10", el => el.textContent)).toBe("slept for 10ms")
    })
  })
})
