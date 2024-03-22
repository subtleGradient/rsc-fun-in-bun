import { FileSystemRouter, build, type BuildArtifact, type BunPlugin } from "bun"
import ServerComponentsPlugin from "bun-plugin-server-components"
if (!1!) console.log(ServerComponentsPlugin)

// @ts-expect-error -- missing types
import { ByteBuffer } from "peechy/bb"
import { decodeClientServerModuleManifest } from "../bun-api/schema"

/** parse components-manifest.blob */
async function parseComponentsManifest(manifest?: Blob) {
  if (!manifest) return null
  return decodeClientServerModuleManifest(new ByteBuffer(new Uint8Array(await manifest.arrayBuffer())))
}

interface RSCBuildArtifact extends Omit<BuildArtifact, "kind"> {
  kind: BuildArtifact["kind"] | "entry-point" | "component-manifest" | "use client" | "use server"
}
declare module "bun" {
  interface BunPlugin {
    // https://github.com/oven-sh/bun/issues/3997#issuecomment-1714207143
    // https://github.com/oven-sh/bun/blob/main/src/bun.js/api/JSBundler.zig
    // https://github.com/oven-sh/bun/blob/b24d3ba5be361b909928826c112789a8bf70bf4b/src/bun.js/api/JSBundler.zig#L94-L137
    SECRET_SERVER_COMPONENTS_INTERNALS?: {
      router?: FileSystemRouter
      directive: {
        client: [""]
        server: [""]
      }
    }
  }
}

if (import.meta.main) {
  const router = new FileSystemRouter({
    dir: "./examples",
    style: "nextjs",
  })

  const serverComponentsPlugin: BunPlugin = {
    setup(build) {},
    name: "rsc-fun-in-bun",
    SECRET_SERVER_COMPONENTS_INTERNALS: {
      router,
      directive: {
        client: [""],
        server: [""],
      },
    },
  }

  const result = await build({
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
