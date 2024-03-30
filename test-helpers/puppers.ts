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
    _pipeConsoleLogs: boolean
    _logPiper: (msg: ConsoleMessage) => void
  }
}

Browser.prototype[Symbol.asyncDispose] = async function () { await this.close() } // prettier-ignore
Page.prototype[Symbol.asyncDispose] = async function () { await this.close() } // prettier-ignore

{
  const logPiper = async (msg: ConsoleMessage) => {
    const args = await Promise.all(msg.args().map(it => it.jsonValue()))
    // @ts-ignore -- trust me bro 😎
    console[msg.type()](...args)
  }

  Object.defineProperties(Page.prototype, {
    _pipeConsoleLogs: { configurable: true, enumerable: false, writable: true, value: false },

    pipeConsoleLogs: {
      configurable: true,
      enumerable: true,
      get() { return this._pipeConsoleLogs }, // prettier-ignore
      set(this: Page, isEnabled: boolean) {
        if (isEnabled) this.on("console", logPiper)
        else this.off("console", logPiper)
        this._pipeConsoleLogs = isEnabled
      },
    },
  })
}

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
})

afterAll(() => browser.close())

// return Object.assign(browser, { [Symbol.dispose]: () => browser.close() })

export { browser, puppeteer }
