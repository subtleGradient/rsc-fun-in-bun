import { tsx } from "../../util/js"
import type { ChunkFilename, ChunkId, RequireFun } from "./types"
const __DEV__ = process.env.NODE_ENV !== "production"

const toy = {
  /** see {@link __toy_framework_require__} */
  require: "__toy_framework_require__",
  /** see {@link __toy_framework_modules__} */
  modules: "__toy_framework_modules__",
  /** see {@link __toy_framework_load__} */
  chunkLoad: "__toy_framework_load__",
} as const

// verify that these globals are defined with the correct names
{
  global[toy.require]
  global[toy.modules]
  global[toy.chunkLoad]
}

export const define: Record<string, string> = {
  /** see {@link __toy_framework_modules__} */
  __webpack_modules__: toy.modules,
  "window.__webpack_modules__": toy.modules,

  /** see {@link __toy_framework_load__} */
  __webpack_chunk_load__: toy.chunkLoad,
  "window.__webpack_chunk_load__": toy.chunkLoad,

  /** see {@link __toy_framework_require__} */
  __webpack_require__: toy.require,
  "window.__webpack_require__": toy.require,

  "process.env.NODE_ENV": process.env.NODE_ENV! === "production" ? '"production"' : '"development"',
  __DEV__: __DEV__ ? "true" : "false",
}

/**
 * A virtual file that contains stuff that needs to be loaded before the client entry point.
 */
export const polyfillsAndStuff = {
  name: "/!/polyfillsAndStuff.mjs",
  type: "text/javascript",
  text: async () =>
    await new Bun.Transpiler({ target: "browser", loader: "tsx", define }).transform(
      tsx`{${!__DEV__ ? "" : tsx`(${verify_define})(${toy})`}}{(${clientEntryPoint_environment_dependencies})()}`,
    ),
}

/** verify that the bundlizer correctly replaced strings */
function verify_define({ chunkLoad, modules, require }: typeof toy) {
  console.assert(
    !(() => process.env.NODE_ENV).toString().match(/process.env.NODE_ENV/),
    "🚨 Something is broken with bundlization",
  )
  console.assert(!(() => __webpack_require__).toString().includes(`"`))
  console.assert(!(() => window.__webpack_require__).toString().includes(`"`))
  console.assert((() => __webpack_require__).toString().includes(require))
  console.assert((() => window.__webpack_require__).toString().includes(require))
  console.assert((() => __webpack_modules__).toString().includes(modules))
  console.assert((() => window.__webpack_modules__).toString().includes(modules))
  console.assert((() => __webpack_chunk_load__).toString().includes(chunkLoad))
  console.assert((() => window.__webpack_chunk_load__).toString().includes(chunkLoad))
  console.log("🚀 bundlization verified")
}

function clientEntryPoint_environment_dependencies() {
  console.log("🚀 polyfillsAndStuff")

  __toy_framework_modules__ = {}

  __toy_framework_load__ = async chunkId => {
    console.log("__NOT__webpack_chunk_load__", chunkId)
    const chunkURL = __toy_framework_require__.c(chunkId)
    if (!chunkURL) throw new Error(`😰 Chunk not found: ${chunkId} in manifest.`)
    return await import(chunkURL)
  }

  const requireFun: RequireFun = moduleId => {
    console.log("__NOT__webpack_require__", moduleId)
    if (!(moduleId in __toy_framework_modules__)) throw new Error(`Module not found: ${moduleId}`)
    return __toy_framework_modules__[moduleId]?.exports
  }

  function getChunkFilename(chunkId: ChunkId): null | ChunkFilename {
    throw new Error("not implemented")
    // const $$ids = Object.keys(__toy_framework__ReactClientManifest) as (keyof IReactClientManifest)[]
    // for (const $$id of $$ids) {
    //   const { chunks } = __toy_framework__ReactClientManifest[$$id]
    //   const chunkIndex = (chunks as ChunkId[]).indexOf(chunkId)
    //   const chunkFilename = chunks[chunkIndex + 1] as ChunkFilename
    //   if (chunkFilename) return chunkFilename
    // }
    // return null
  }

  __toy_framework_require__ = Object.assign(requireFun, {
    m: {},
    c: getChunkFilename,
    d: {},
    n: {},
    o: {},
    p: {},
    s: {},
  })
}
