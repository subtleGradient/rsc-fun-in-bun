/// <reference types="bun" />

function assert(test: unknown, reason: string) {
  if (!test) throw new Error(reason)
}
async function isReactServerEnvironment() {
  const React = require("react")
  const INTERNALS_KEY = Object.keys(React).find(k => k.includes("INTERNALS"))
  assert(!INTERNALS_KEY?.includes("CLIENT"), "React internals key should not include CLIENT")
  assert(INTERNALS_KEY?.includes("SERVER"), "React internals key should include SERVER")
  // assert(typeof window === "undefined", "window should not be defined in react server environment")
}

const isChildProcess = async () => assert(!!process.send, "process.send should be defined in child process")
const returns = (value: unknown) => () => value

async function regularServer() {
  assert(typeof window === "undefined", "window should not be defined in regular server environment")
  console.log("is NOT react-server")
  const { default: ReactDOMServer } = await import("react-dom/server")
  const { default: ReactServerDOMClient } = await import("react-server-dom-webpack/client.edge")
  console.log({ ReactDOMServer: !!ReactDOMServer, ReactServerDOMClient: !!ReactServerDOMClient })
}

async function reactServer() {
  assert(typeof window === "undefined", "window should not be defined in react server environment")
  console.log("is react-server")
  const { default: ReactServerDOMServer } = await import("react-server-dom-webpack/server")
  console.log({ ReactServerDOMServer: !!ReactServerDOMServer })
}

async function parentProcess() {
  console.log("is parent process")
  assert(!process.send, "process.send should NOT be defined in child process")
  const isReactServer = await isReactServerEnvironment().then(returns(true), returns(false))

  const child = Bun.spawn([process.execPath, isReactServer ? "" : "--conditions=react-server", __filename], {
    stdio: ["ignore", "inherit", "inherit"],
    // https://bun.sh/guides/process/ipc
    ipc(message, subprocess) {
      console.log("IPC from child:", message)
      subprocess.send("reply from parent")

      if (message.childSockName) {
        childSockName = message.childSockName
      }
    },
  })

  const server = Bun.serve({
    port: isReactServer ? 3000 : 3001,
    async fetch(req) {
      const url = new URL(req.url)
      const conditions = url.searchParams.getAll("conditions")
      const wantsReactServer = conditions.includes("react-server")
      const isReactServer = await isReactServerEnvironment().then(returns(true), returns(false))

      if (wantsReactServer != isReactServer)
        return fetch(url, {
          ...req,

          // https://bun.sh/guides/http/fetch-unix
          // @ts-expect-error -- missing types for unix option
          unix: childSockName,
        })

      return new Response(`hi from parent server at ${req.url}`)
    },
  })
  console.log("server started at", server.url.href)

  const childUrlFromParent = new URL(server.url.href)
  childUrlFromParent.searchParams.append("conditions", isReactServer ? "NOT-react-server" : "react-server")
  console.log("can also handle", childUrlFromParent.href)

  child.send("hi from parent")
}

let childSockName: string

async function childProcess() {
  console.log("is child process")
  assert(!!process.send, "process.send should be defined in child process")
  process.send!("hi from child")
  process.on("message", message => {
    console.log("IPC from parent:", message)
    // process.send!("reply from child") // this will cause an infinite loop
  })

  const isReactServer = await isReactServerEnvironment().then(returns(true), returns(false))

  const sockName = `${process.env.TMPDIR ?? "/tmp/"}${isReactServer ? "react-server" : "not-react-server"}.${Date.now().toString(26)}.${process.ppid}.${process.pid}.sock`
  process.on("exit", () => fs.unlinkSync(sockName))

  const server = Bun.serve({
    unix: sockName, // path to socket
    fetch(req) {
      return new Response(`hi from child server at ${req.url}`)
    },
  })
  process.send!({ childSockName: sockName })
  // console.log("server started at", server.url.href)
}
import fs from "fs"

function main() {
  isChildProcess().then(childProcess, parentProcess)
  isReactServerEnvironment().then(reactServer, regularServer)
}

main()
