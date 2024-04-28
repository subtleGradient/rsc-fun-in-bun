import { forkWithConditions } from "./fork-ipc"

export function assert(test: unknown, reason: string) {
  if (!test) throw new Error(reason)
}

export async function assertReactServerEnvironment() {
  const React = require("react")
  const INTERNALS_KEY = Object.keys(React).find(k => k.includes("INTERNALS"))
  assert(!INTERNALS_KEY?.includes("CLIENT"), "React internals key should not include CLIENT")
  assert(INTERNALS_KEY?.includes("SERVER"), "React internals key should include SERVER")
  // assert(typeof window === "undefined", "window should not be defined in react server environment")
}

export const assertChildProcess = async () => assert(!!process.send, "process.send should be defined in child process")

export const returns = (value: unknown) => () => value

export const isReactServer = await assertReactServerEnvironment().then(returns(true), returns(false))
export const isNotReactServer = !isReactServer

export const isChild = await assertChildProcess().then(returns(true), returns(false))
export const isParent = !isChild

if (import.meta.main) {
  console.log({ isChild, isReactServer })
  forkWithConditions({ entrypoint: __filename, conditions: { "react-server": isNotReactServer } })
}
