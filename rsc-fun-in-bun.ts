import { verifyReactServer } from "./toy-framework/server/verify-react-server.ts"

if (import.meta.main) {
  verifyReactServer()
  const { routes, fetch } = await import("./toy-framework/server/toy-framework.server.tsx")
  const server = Bun.serve({ fetch })

  console.log("Server running at", server.url.href)
  console.log(
    "    Responds to these routes:\n",
    Object.keys(routes)
      .map(pathname => `\t${server.url.origin}${pathname}`)
      .join("\n"),
  )
  console.log()
}
