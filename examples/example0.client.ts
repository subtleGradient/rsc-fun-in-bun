/// <reference lib="dom" />
"use client"

export {} // Make this a module

console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.")

export async function doStuffOnTheServer_definedInClientCode() {
  "use server"
  console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.")

  const { $ } = await import("bun")
  return await $`ls -la`.text()
}

export async function example() {
  // "use client" is not necessary here, because it's already at the top of the file
  console.assert(typeof window !== "undefined", "This is client-side code, so `window` should be defined.")
  console.log("Hello from example0!")
  const results = await doStuffOnTheServer_definedInClientCode()
  console.log("Server stuff done!")
  console.log(results)
}
