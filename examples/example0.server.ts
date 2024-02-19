"use server"

import { $ } from "bun"

console.debug("executing", import.meta.url)
console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")

export async function doStuffOnTheServer() {
  // "use server" directive is not necessary here, because it's already at the top of the file
  console.debug("executing", import.meta.url, "doStuffOnTheServer")
  console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")

  return await $`ls -l $TMPDIR`.text()
}
