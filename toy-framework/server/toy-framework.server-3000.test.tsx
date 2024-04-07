import { browser } from "@/test-helpers/puppers.ts"
import { describe, expect, it } from "bun:test"

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
      await using page = await browser.newPage()
      page.goto(`http://localhost:3000`)
      await page.waitForSelector("#generated-by-client")
      expect(await page.$eval("#generated-by-client", el => el.textContent)).toBe("Hello from ClientComponent!")
    })
  })

  describe("/rsc/test-suspense", () => {
    it("returns RSC content", async () => {
      const response = await fetch(new Request(`http://localhost:3000/rsc/test-suspense`))
      expect(response.status).toBe(200)
      expect(await response.text()).toMatchSnapshot()
    })
    it("updates asynchronously", async done => {
      const response = await fetch(new Request(`http://localhost:3000/rsc/test-suspense`))
      // stream the responce anf verify that it sends multiple chunks
      const decoder = new TextDecoder()
      const reader = response.body!.getReader()
      reader.closed.then(done)
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        expect(decoder.decode(value)).toMatchSnapshot()
      }
    })
  })
})
