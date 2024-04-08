import { tsx } from "../../util/js"

export const define: Record<string, string> = {
  __webpack_require__: "__NOT__webpack_require__",
  __webpack_modules__: "__NOT__webpack_modules__",
  __webpack_chunk_load__: "__NOT__webpack_chunk_load__",

  "process.env.NODE_ENV": process.env.NODE_ENV! === "production" ? '"production"' : '"development"',
  __DEV__: process.env.NODE_ENV! === "development" ? "true" : "false",
}

/**
 * A virtual file that contains stuff that needs to be loaded before the client entry point.
 */
export const polyfillsAndStuff = {
  name: "/!/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () => await new Bun.Transpiler({ target: "browser", loader: "tsx", define }).transform(tsx`(${main})()`),
}

declare global {
  interface Window {
    __NOT__webpack_modules__: Record<string, { exports: unknown }>
  }
}

async function main() {
  const webpackGetChunkFilename = (chunkId: string) => {
    throw new Error("webpackGetChunkFilename not implemented")
  }

  const __NOT__webpack_modules__: Record<string, { exports: unknown }> = {}
  const __NOT__webpack_chunk_load__ = async (chunkId: string) => await import(chunkId)
  const __NOT__webpack_require__ = Object.assign(
    (moduleId: string) => {
      console.log("__NOT__webpack_require__", moduleId)
      if (!(moduleId in __NOT__webpack_modules__))
        throw new Error(`Module not found: ${moduleId}; Need to add
          __NOT__webpack_modules__["${moduleId}"] = { exports: ... }`)
      return __NOT__webpack_modules__[moduleId]?.exports
    },
    { m: {}, c: webpackGetChunkFilename, d: {}, n: {}, o: {}, p: {}, s: {} },
  )

  Object.assign(window, { __NOT__webpack_modules__, __NOT__webpack_chunk_load__, __NOT__webpack_require__ })
}
