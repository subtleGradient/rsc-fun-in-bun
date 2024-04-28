/// <reference types="bun" />

import type { Subprocess, UnixServeOptions } from "bun"

const sockKey = ":: child server unix sock name ::"
type SockMess = { [sockKey]?: string }
type AnyMess = SockMess | (string & Partial<SockMess>)
type OnMess = (mess: AnyMess, subprocess: UnixOptionsWithSubprocess["subprocess"]) => void
type OnMessRef = { current: null | OnMess }
type UnixOptionsWithSubprocess = Pick<UnixServeOptions, "unix"> & {
  subprocess: Subprocess | typeof process
  onmessageRef: OnMessRef
}

import { isChild, isParent } from "./assert-environment"

import fs from "fs"

export function getDisposableKidSock() {
  const kidSock = `${process.env.TMPDIR ?? "/tmp/"}serveDoubleReactServer.${Date.now().toString(26)}.${process.ppid}.${process.pid}.sock`
  const dispose = () => fs.unlinkSync(kidSock)
  process.on("exit", dispose)
  process.on("beforeExit", dispose)
  process.on("SIGTERM", dispose)
  process.on("SIGINT", dispose)
  return { sock: kidSock, [Symbol.dispose]: dispose }
}

type ForkWithConditionsProps = Partial<Pick<UnixServeOptions, "unix">> & {
  entrypoint: string
  conditions: { "react-server": boolean }
}

export async function forkWithConditions(props: ForkWithConditionsProps) {
  const sock = Promise.withResolvers<UnixOptionsWithSubprocess>()
  const onmessageRef: OnMessRef = { current: null }

  // 0. Communication is key
  const ipc: OnMess = (mess, subprocess) => onmessageRef.current?.(mess, subprocess ?? process)

  onmessageRef.current = (mess, subprocess) => {
    if (!(sockKey in mess)) return
    // (4. Parent| 6. Kid) We're only looking for one sock
    onmessageRef.current = null
    // 5. Parent → Kid: You did find the sock!
    if (isParent) subprocess.send?.(mess)
    // (7. Kid | 8. Parent) → everybody: the sock is here!
    sock.resolve({ onmessageRef, subprocess, unix: mess[sockKey]! })
  }

  // 1. Parent: have a kid; listen to them
  if (isParent) {
    const args = Object.entries(props.conditions).flatMap(([key, val]) => (val ? [`--conditions=${key}`] : []))
    Bun.spawn([process.execPath, ...args, props.entrypoint], { ipc, stdio: ["ignore", "inherit", "inherit"] })
  }
  // 2. Kid: listen to your parent
  else process.on("message", ipc)

  // 3. Kid → Parent: found the sock!
  if (isChild) process.send!({ [sockKey]: props.unix ?? getDisposableKidSock().sock })

  // 8. Ok, enough with the sock stuff already
  return await sock.promise
}
