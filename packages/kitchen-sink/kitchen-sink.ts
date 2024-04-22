import { fetch, routes } from "@rsc-fun-in-bun/toy-framework/server/toy-framework.server.ts"
import { routesForTestingRSC_suspense } from "./routesForTestingRSC-suspense.tsx"
import { routesForTestingRSC_use_client } from "./routesForTestingRSC_use_client.tsx"

// if (import.meta.main)
{
  Object.assign(routes, {
    // TODO: move this to a test file somewhere
    ...routesForTestingRSC_suspense,
    ...routesForTestingRSC_use_client,
  })

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
