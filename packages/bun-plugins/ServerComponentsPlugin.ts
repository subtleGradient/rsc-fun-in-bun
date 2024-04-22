import { FileSystemRouter, type BuildArtifact, type BunPlugin } from "bun"

/**
 * bun-plugin-server-components@0.0.1-alpha.0, this doesn't work with bun@1.1.2 innards
 * {@link ServerComponentsPlugin_notWorkingSoGreat}
 */
import ServerComponentsPlugin_notWorkingSoGreat from "bun-plugin-server-components"

export function ServerComponentsPlugin(config: { server: string[]; client: string[]; router: FileSystemRouter }): BunPlugin {
  return {
    name: "bun (RSC) React Server Components (Bun internals)",
    SECRET_SERVER_COMPONENTS_INTERNALS: {
      router: config.router,
      directive: {
        client: config.client,
        server: config.server,
      },
    },
    setup(build) {}, // this is a no-op?
  }
}

declare module "bun" {
  interface BunPlugin {
    /**
     * types for {@link BunPlugin.SECRET_SERVER_COMPONENTS_INTERNALS} of bun@1.1.2
     *
     * Source: https://github.com/oven-sh/bun/blob/main/src/bun.js/api/JSBundler.zig
     * Permalink: https://github.com/oven-sh/bun/blob/b24d3ba5be361b909928826c112789a8bf70bf4b/src/bun.js/api/JSBundler.zig#L94-L137
     * More info: https://github.com/oven-sh/bun/issues/3997#issuecomment-1714207143
     */
    SECRET_SERVER_COMPONENTS_INTERNALS?: {
      router?: FileSystemRouter
      directive: {
        client: string[]
        server: string[]
      }
    }
  }
}

import { decodeClientServerModuleManifest } from "@rsc-fun-in-bun/bun-api/schema"

// @ts-expect-error -- missing types
import { ByteBuffer } from "peechy/bb"

/** parse components-manifest.blob */
async function parseComponentsManifest(manifest?: Blob) {
  if (!manifest) return null
  return decodeClientServerModuleManifest(new ByteBuffer(new Uint8Array(await manifest.arrayBuffer())))
}

interface RSCBuildArtifact extends Omit<BuildArtifact, "kind"> {
  kind: BuildArtifact["kind"] | "entry-point" | "component-manifest" | "use client" | "use server"
}

if (import.meta.main) {
  const router = new FileSystemRouter({
    dir: "./examples",
    style: "nextjs",
  })

  const serverComponentsPlugin = ServerComponentsPlugin({
    router,
    server: ["./HomePage.tsx"],
    client: ["./HomePage.tsx"],
  })

  const result = await Bun.build({
    entrypoints: [await import.meta.resolve("../examples/HomePage.tsx")],
    target: "bun",
    outdir: "./build",
    sourcemap: "inline",
    plugins: [serverComponentsPlugin],
  })

  console.log(result)
  const outputs = result.outputs
  const manifest = outputs.find(o => (o.kind as RSCBuildArtifact["kind"]) === "component-manifest")
  // console.log(await manifest?.arrayBuffer())

  const manifestParsed = await parseComponentsManifest(manifest)
  console.log(manifestParsed)
  // console.log(manifestParsed.serverModules)

  // standard manifest
  // for the top-level (server components) build
  // result.manifest

  // manifest for client build
  // result.clientManifest

  // manifest for client build
  // result.ssrManifest
}
