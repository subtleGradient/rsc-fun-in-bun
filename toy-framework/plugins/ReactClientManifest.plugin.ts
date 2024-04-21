import { type BunPlugin } from "bun"
import { ReactClientManifest } from "./ReactClientManifest"

/** @deprecated -- not sure if this is a good idea anymore 🤷‍♂️ */
export const ReactClientManifest_pluginConfig: BunPlugin = {
  name: "React Client Manifest",
  setup(build) {
    build.onLoad({ filter: /ReactClientManifest\.json$/ }, () => {
      return { loader: "object", exports: ReactClientManifest }
    })
  },
}
