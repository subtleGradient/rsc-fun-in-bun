"use client"

import { useSyncExternalStore } from "use-sync-external-store/shim"

function intervalStore(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000)
  return () => clearInterval(interval)
}

export function Timer() {
  useSyncExternalStore(intervalStore, Math.random, Math.random)

  return <>{new Date().toLocaleTimeString()}</>
}
