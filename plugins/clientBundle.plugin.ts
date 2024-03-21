import { build, type BunPlugin } from "bun"
import { ReactClientManifest_pluginConfig } from "./ReactClientManifest.plugin"
import { useServer_fromClient_pluginConfig } from "./useServer_fromClient.plugin"

export async function clientBundle(pathToEntryPointSource: string) {
  // TODO: cache the client bundle output and only rebuild if the source has changed or something?

  const bundle = await build({
    root: __dirname,
    entrypoints: [pathToEntryPointSource],

    target: "browser",
    outdir: `${pathToEntryPointSource}.clientBundle`,

    sourcemap: "inline",
    minify: false,
    splitting: false, // TODO: figure out how splitting works wrt client bundle loading

    plugins: [
      useServer_fromClient_pluginConfig, //
      ReactClientManifest_pluginConfig,
    ],
  })

  const entryPoint = bundle.outputs.find(output => output.kind === "entry-point")

  if (!(bundle.success && entryPoint)) {
    bundle.logs.forEach(log => console.warn(log))
    throw new Error("Failed to build client bundle entry-point")
  }

  return { entryPoint, ...bundle }
}

export const clientBundle_pluginConfig: BunPlugin = {
  name: "React RSC client bundle",
  target: "bun",
  setup(build) {
    build.onLoad({ filter: /\.clientBundle$/ }, async args => {
      const bundle = await clientBundle(args.path)
      return { loader: "text", contents: await bundle.entryPoint.text() }
    })
  },
}
