"use server"

import { $ } from "bun"

console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")

export async function doStuffOnTheServer() {
  return await $`ls -la`.text()
}
