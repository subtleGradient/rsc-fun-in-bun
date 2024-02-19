"use client"
import React from "react"

function intervalStore(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000)
  return () => clearInterval(interval)
}
export function Timer() {
  React.useSyncExternalStore(intervalStore, Math.random)

  return <>{new Date().toLocaleTimeString()}</>
}
