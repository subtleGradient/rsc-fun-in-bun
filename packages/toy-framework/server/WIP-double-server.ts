function assert(test: unknown, reason: string) {
  if (!test) throw new Error(reason)
}
async function isReactServerEnvironment() {
  assert(typeof window === "undefined", "window should not be defined in react server environment")
  const React = require("react")
  const INTERNALS_KEY = Object.keys(React).find(k => k.includes("INTERNALS"))
  assert(!INTERNALS_KEY?.includes("CLIENT"), "React internals key should not include CLIENT")
  assert(INTERNALS_KEY?.includes("SERVER"), "React internals key should include SERVER")
}

isReactServerEnvironment().then(reactServer, regularServer)

async function regularServer() {
  assert(typeof window === "undefined", "window should not be defined in regular server environment")
  console.log("is NOT react-server")
  const { default: ReactDOMServer } = await import("react-dom/server")
  const { default: ReactServerDOMClient } = await import("react-server-dom-webpack/client.edge")
  console.log({ ReactDOMServer: !!ReactDOMServer, ReactServerDOMClient: !!ReactServerDOMClient })

  // https://bun.sh/guides/process/ipc
  if (!process.send) {
    const child = Bun.spawn([process.execPath, "--conditions=react-server", __filename], {
      ipc(message, subprocess) {
        console.log("IPC message:", message)
        subprocess.send("pong")
      },
    })
    child.send("ping")
  }
}

async function reactServer() {
  assert(typeof window === "undefined", "window should not be defined in react server environment")
  console.log("is react-server")
  const { default: ReactServerDOMServer } = await import("react-server-dom-webpack/server")
  console.log({ ReactServerDOMServer: !!ReactServerDOMServer })

  // https://bun.sh/guides/process/ipc
  if (!process.send) {
    const child = Bun.spawn([process.execPath, __filename], {
      ipc(message, subprocess) {
        console.log("IPC message:", message)
        subprocess.send("pong")
      },
    })
    child.send("ping")
  }
}

if (process.send) {
  process.send?.("hi")
  Object.assign(console, { log: (...args: unknown[]) => process.send?.(["CONSOLE", ...args]) })
}

// import JSX from "react/jsx-runtime"
// import React from "react"
// const INTERNALS_KEY = Object.keys(React).find(k => k.includes("INTERNALS"))
// console.log(React.version, __filename, INTERNALS_KEY)

// import path from "path"
// const reactPath = Bun.resolveSync("react", "")

// console.log(path.dirname(reactPath))

// const realm = new ShadowRealm()

// console.log(realm.importValue(Bun.resolveSync("react", ""), "React"))
// console.log(realm)

// import ReactServerDOMClient from "react-server-dom-webpack/client"
// console.log(ReactServerDOMClient)

// import ReactServerDOMServer from "react-server-dom-webpack/server"
// ReactServerDOMServer.renderToReadableStream
