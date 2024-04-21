import type { BunPlugin } from "bun"

export const useServer_fromClient_pluginConfig: BunPlugin = {
  name: "React RSC use server (from client)",
  target: "browser",
  setup(build) {
    // TODO: look at the first line of the moduleSource to see if it has "use client" or "use server"
  },
}
