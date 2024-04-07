import { verifyReactServer } from "./toy-framework/verify-react-server.ts"

console.log("Hello via Bun!")
console.debug("executing", import.meta.url)
console.debug(process.argv)

verifyReactServer()

if (import.meta.main) {
  const { fetch } = await import("./toy-framework/toy-framework.server.tsx")
  const server = Bun.serve({ fetch })
  console.log("Server running at", server.url.href)
}
