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
      console.log("from child:", message)
      subprocess.send("reply from parent")
    },
  })

  child.send("hi from parent")
}

async function childProcess() {
  console.log("is child process")
  assert(!!process.send, "process.send should be defined in child process")
  process.send!("hi from child")
  process.on("message", message => {
    console.log("from parent:", message)
    // process.send!("reply from child") // this will cause an infinite loop
  })
}

isChildProcess().then(childProcess, parentProcess)
isReactServerEnvironment().then(reactServer, regularServer)
