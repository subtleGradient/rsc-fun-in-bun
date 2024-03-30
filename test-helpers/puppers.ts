import { afterAll, beforeAll } from "bun:test"
import puppeteer, { Browser, ConsoleMessage, Page } from "puppeteer-core"

let browser: Browser

////////////////////////////////////////////////////////////////
// duck punching shennanigans

declare module "puppeteer-core" {
  interface Browser {
    [Symbol.asyncDispose](): Promise<void>
  }
  interface Page {
    [Symbol.asyncDispose](): Promise<void>
    pipeConsoleLogs: boolean
    $pipeConsoleLogs_isEnabled: boolean
  }
}

Browser.prototype[Symbol.asyncDispose] = async function () {
  if (this.connected) await this.close()
}

Page.prototype[Symbol.asyncDispose] = async function () {
  if (!this.isClosed()) await this.close({ runBeforeUnload: false })
}

Object.defineProperties(Page.prototype, {
  pipeConsoleLogs_isEnabled: { configurable: true, enumerable: false, writable: true, value: false },
  pipeConsoleLogs: {
    configurable: true,
    enumerable: true,
    get(this: Page) { return this.$pipeConsoleLogs_isEnabled }, // prettier-ignore
    set(this: Page, isEnabled: boolean) {
      if ((this.$pipeConsoleLogs_isEnabled = isEnabled)) {
        this.on("console", async (msg: ConsoleMessage) => {
          const args = await Promise.all(msg.args().map(it => it.jsonValue()))
          // @ts-ignore -- trust me bro 😎
          console[msg.type()](...args)
        })
        this.on("error", console.error)
      } else {
        this.off("console")
        this.off("error")
      }
    },
  },
})

////////////////////////////////////////////////////////////////

beforeAll(async () => {
  const headless = JSON.parse(process.env.PUPPETEER_HEADLESS ?? "false") as boolean
  if (!headless) console.warn("set PUPPETEER_HEADLESS=true to run headless")

  const executablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

  console.assert(
    await Bun.file(executablePath).exists(),
    "Chrome executable not found, set PUPPETEER_EXECUTABLE_PATH env var",
  )

  browser = await puppeteer.launch({
    executablePath,
    headless,
    defaultViewport: null,
    waitForInitialPage: false,
    args: [
      "--no-startup-window", // each new page will open in a new window instead of tabs
    ],
  })

  process.once("beforeExit", async () => await browser.close())
})

afterAll(() => browser.close())

export { browser, puppeteer }
