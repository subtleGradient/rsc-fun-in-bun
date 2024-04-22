import type { ChunkFilename, ChunkId, ChunkMap, IReactClientManifest, PWRV, RequireFun, ToyFrameworkNames } from "../types"
import { js } from "./string-template"
const __DEV__ = process.env.NODE_ENV !== "production"

const names: ToyFrameworkNames = {
  /** see {@link __toy_framework__.displayName} */
  framework: "__toy_framework__",
  /** see {@link __toy_framework_require__.displayName} */
  require: "__toy_framework_require__",
  /** see {@link __toy_framework_modules__.displayName} */
  modules: "__toy_framework_modules__",
  /** see {@link __toy_framework_load__.displayName} */
  chunkLoad: "__toy_framework_load__",
}

// verify that these globals are defined with the correct names
{
  global[names.framework]
  global[names.require]
  global[names.modules]
  global[names.chunkLoad]
}

export const define: Record<string, string> = {
  /** see {@link __toy_framework_modules__} */
  __webpack_modules__: names.modules,
  "window.__webpack_modules__": names.modules,

  /** see {@link __toy_framework_load__} */
  __webpack_chunk_load__: names.chunkLoad,
  "window.__webpack_chunk_load__": names.chunkLoad,

  /** see {@link __toy_framework_require__} */
  __webpack_require__: names.require,
  "window.__webpack_require__": names.require,

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
      js`{${!__DEV__ ? "" : js`(${verify_define})(${names})`}}` + //
        js`{(${clientEntryPoint_environment_dependencies})()}`,
    ),
}

/** verify that the bundlizer correctly replaced strings */
function verify_define({ chunkLoad, modules, require }: ToyFrameworkNames) {
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
  // TODO: move to separate file
  {
    const Promise_withResolvers = <T>() => {
      let resolve!: (value: T | PromiseLike<T>) => void
      let reject!: (reason?: unknown) => void
      const promise = new Promise<T>((resolver, rejector) => ([resolve, reject] = [resolver, rejector]))
      return { promise, resolve, reject } as const
    }

    if (!("withResolvers" in Promise)) {
      Object.defineProperty(Promise, "withResolvers", { value: Promise_withResolvers })
    }
  }

  // TODO: move to separate file
  function makePWRV<T>(): PWRV<T> {
    const resolvers = Promise.withResolvers<T>()
    const pwrv: PWRV<T> = Object.assign(resolvers.promise, resolvers)
    Object.assign<PWRV<T>, Partial<PWRV<T>>>(pwrv, { status: "pending" as const })
    pwrv.then(
      value => Object.assign<PWRV<T>, Partial<PWRV<T>>>(pwrv, { status: "fulfilled" as const, value }),
      reason => Object.assign<PWRV<T>, Partial<PWRV<T>>>(pwrv, { status: "rejected" as const, reason }),
    )
    if (__DEV__)
      pwrv.then(
        value => console.log("🚀 PWRV resolved", pwrv),
        reason => console.error("🚨 PWRV rejected", pwrv),
      )
    return pwrv
  }

  console.log("🚀 polyfillsAndStuff")

  __toy_framework__ = {
    manifest: makePWRV<IReactClientManifest>(),
    chunkMap: makePWRV<ChunkMap>(),
  }

  __toy_framework_modules__ = {}

  __toy_framework_load__ = async chunkId => {
    if (__DEV__) console.log("loading chunk by id", chunkId)
    await __toy_framework__.manifest
    const chunkURL = __toy_framework_require__.c(chunkId)
    if (!chunkURL) throw new Error(`😰 Chunk not found: ${chunkId} in manifest.`)
    return await import(chunkURL)
  }

  const requireFun: RequireFun = moduleId => {
    if (__DEV__) console.log("requiring module by id", moduleId)
    if (!(moduleId in __toy_framework_modules__)) throw new Error(`Module not found: ${moduleId}`)
    return __toy_framework_modules__[moduleId]?.exports
  }

  function getChunkFilename(chunkId: ChunkId): null | ChunkFilename {
    // throw new Error("not implemented")
    console.debug("manifest", __toy_framework__.manifest)
    if (__toy_framework__.manifest.status !== "fulfilled") throw new Error("getChunkFilename; Manifest not loaded")
    const $$ids = Object.keys(__toy_framework__.manifest.value!) as (keyof IReactClientManifest)[]
    for (const $$id of $$ids) {
      const { chunks } = __toy_framework__.manifest.value![$$id]
      const chunkIndex = (chunks as ChunkId[]).indexOf(chunkId)
      const chunkFilename = chunks[chunkIndex + 1] as ChunkFilename
      if (chunkFilename) return chunkFilename
    }
    return null
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
