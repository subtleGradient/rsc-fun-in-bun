import { type BunFile } from "bun"
import { externalsBundle } from "./externalsBundle"
import { define } from "./polyfillsAndStuff"

async function fetchFileThatExists(request: Request, file: BunFile) {
  const build = await Bun.build({
    format: "esm",
    target: "browser",
    entrypoints: [file.name!],
    define,
    external: Object.keys(externalsBundle.importMap),
  })
  const output = build.outputs[0]
  return new Response(output, { headers: { "Content-Type": output.type, "Cache-Control": "no-store" } })
}
