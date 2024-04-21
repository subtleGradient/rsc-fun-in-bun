import { routesForTestingRSC_suspense } from "#toy-framework/server/routesForTestingRSC-suspense.tsx"
import { routesForTestingRSC_use_client } from "#toy-framework/server/routesForTestingRSC_use_client.tsx"
import { fetch, routes } from "#toy-framework/server/toy-framework.server.ts"

if (import.meta.main) {
  await import("#toy-framework/server/verify.react-server.ts")

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
} else {
  console.log(
    `This module ${import.meta.url} is not meant to be run as a script. Try running the main module instead. See package.json`,
    import.meta.main,
  )
}
