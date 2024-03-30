import { afterAll, beforeAll } from "bun:test"
import puppeteer, { Browser } from "puppeteer-core"

let browser: Browser

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
