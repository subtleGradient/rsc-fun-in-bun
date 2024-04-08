import { type BunPlugin } from "bun"

type rcmRecord = { id: string; chunks: string[]; name: string }
export const ReactClientManifest: Record<string, rcmRecord> = {}

export const ReactClientManifest_pluginConfig: BunPlugin = {
  name: "React Client Manifest",
  setup(build) {
    build.onLoad({ filter: /ReactClientManifest\.json$/ }, () => {
      return { loader: "object", exports: ReactClientManifest }
    })
  },
}
