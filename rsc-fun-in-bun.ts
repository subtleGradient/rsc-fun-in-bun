import { verifyReactServer } from "./toy-framework/server/verify-react-server.ts"

if (import.meta.main) {
  verifyReactServer()
  const { fetch } = await import("./toy-framework/server/toy-framework.server.tsx")
  const server = Bun.serve({ fetch })
  console.log("Server running at", server.url.href)
}
