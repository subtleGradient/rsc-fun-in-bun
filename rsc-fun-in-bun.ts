import { verifyReactServer } from "./verify-react-server"

console.log("Hello via Bun!")
console.debug("executing", import.meta.url)
console.debug(process.argv)

verifyReactServer()

if (import.meta.main) {
  const { router } = await import("./examples/server.tsx")
  const server = Bun.serve({ fetch: router })
  console.log("Server running at", server.url.href)
}
