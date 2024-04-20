import type { define } from "@/toy-framework/server/polyfillsAndStuff"
import { type Server } from "bun"

/** Track stuff that is not done yet */
export type TODO = any

declare global {
  declare var __toy_framework__: {
    manifest: {
      promise: Promise<IReactClientManifest>
      resolve?: (manifest: IReactClientManifest) => void
      reject?: (error: Error) => void
    }
    chunkMap: {
      promise: Promise<ChunkMap>
      resolve?: (chunkMap: ChunkMap) => void
      reject?: (error: Error) => void
    }
  }

  declare var __toy_framework_modules__: Record<ModuleID, ModuleIsh>
  declare var __toy_framework_load__: (chunkId: ChunkId & ReactClientManifestRecord["chunks"][0]) => Promise<TODO>
  declare var __toy_framework_require__: RequireFun & {
    m: TODO
    c: webpackGetChunkFilename
    d: TODO
    n: TODO
    o: TODO
    p: TODO
    s: TODO
  }
}

declare global {
  /** @deprecated -- this will be replaced with {@link __toy_framework_modules__} in the bundlization, see {@link define} */
  declare const __webpack_modules__: typeof __toy_framework_modules__
  /** @deprecated -- this will be replaced with {@link __toy_framework_load__} in the bundlization, see {@link define} */
  declare const __webpack_chunk_load__: typeof __toy_framework_load__
  /** @deprecated -- this will be replaced with {@link __toy_framework_require__} in the bundlization, see {@link define} */
  declare const __webpack_require__: typeof __toy_framework_require__

  interface Window {
    /** @deprecated -- drop the `window.`, just {@link __toy_framework_modules__}, it's cleaner */
    __NOT__webpack_modules__: typeof __toy_framework_modules__
    /** @deprecated -- drop the `window.`, just {@link __toy_framework_load__}, it's cleaner */
    __NOT__webpack_chunk_load__: typeof __toy_framework_load__
    /** @deprecated -- drop the `window.`, just {@link __toy_framework_require__}, it's cleaner */
    __NOT__webpack_require__: typeof __toy_framework_require__

    /** @deprecated -- this will be replaced with {@link __toy_framework_modules__} in the bundlization, see {@link define} */
    __webpack_modules__: typeof __toy_framework_modules__
    /** @deprecated -- this will be replaced with {@link __toy_framework_load__} in the bundlization, see {@link define} */
    __webpack_chunk_load__: typeof __toy_framework_load__
    /** @deprecated -- this will be replaced with {@link __toy_framework_require__} in the bundlization, see {@link define} */
    __webpack_require__: typeof __toy_framework_require__
  }
}

export type RequireFun = (id: ModuleID) => ModuleIsh["exports"]
type webpackGetChunkFilename = (chunkId: ChunkId) => null | ChunkFilename

type ModuleIsh = { exports: TODO }

export type Pathname = `/${string}`

/** unique id for a loadable module like a {@link ChunkId} */
export type ModuleID = (number | string) & { __moduleId__?: void }

export type RouteMap = Record<Pathname, Server["fetch"]>

export type ImportMap = Record<ModuleID, Pathname>

/** unique id for a loadable dependency */
export type ChunkId = (string | number) & { __chunkId__?: void }

/** loadable URL or partial URL for a chunk */
export type ChunkFilename = string & { __chunkFilename__?: void }

type ChunkMap = Record<ChunkId, ChunkFilename>

/** name of something exported from a client module */
export type ClientModuleExportName = string & { __ClientModuleExportName__?: void }

/** $$id attribute of a Client Reference or Server Reference */
export type ReactReference$$id = `${ModuleID}#${ClientModuleExportName}`

export type ReactClientManifestRecord = { id: ModuleID; chunks: DependencyChunks; name: ClientModuleExportName }

export type IReactClientManifest = Record<ReactReference$$id, ReactClientManifestRecord>

export type ChunkPair = [ChunkId, ChunkFilename]

type ChunkPair2 = [...ChunkPair, ...ChunkPair]
export type DependencyChunks =
  | []
  | ChunkPair
  | ChunkPair2
  | [...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2]
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair] // prettier-ignore
  | [...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2, ...ChunkPair2] // prettier-ignore

// example of a bit from a decoded text/x-component stream from v0.dev
// prettier-ignore
const v0_example: [id: ModuleID, chunks: DependencyChunks, name: ClientModuleExportName] = [
  68249,
  [
    5145, "static/chunks/fbdd6141-c636f43e020ddf6c.js",
    6917, "static/chunks/6917-135ed5e68f486fe9.js",
    9564, "static/chunks/9564-f3ac635db5284176.js",
    9152, "static/chunks/9152-6df8551737a03ea4.js",
    943, "static/chunks/943-8173cf9b71d74fc2.js",
    6133, "static/chunks/6133-18ed08a85eeb4d86.js",
    5768, "static/chunks/5768-ac6d648251645d73.js",
    1929, "static/chunks/1929-f27505d2dddc3ccf.js",
    532, "static/chunks/532-a8264eb8a1ba513f.js",
    4792, "static/chunks/4792-0cf8f7efa20e713f.js",
    766, "static/chunks/766-fb6658bda0891b07.js",
    9389, "static/chunks/9389-dbc9f200acd97458.js",
    7225, "static/chunks/7225-437d69aa62ccd6d3.js",
    3858, "static/chunks/3858-37c5ab8eeec20258.js",
    5703, "static/chunks/5703-dd5dbcd1b8c43726.js",
    8143, "static/chunks/8143-78965ed0c227aa92.js",
    8986, "static/chunks/8986-a23efbb8bd9f6564.js",
    379, "static/chunks/379-6fe104a0e8a298d8.js",
    3916, "static/chunks/3916-7f4b14f3eb56d55f.js",
    9238, "static/chunks/9238-fd8bc4385df03cac.js",
    2490, "static/chunks/app/(v2)/(docs)/layout-7abe475741efd1cb.js",
  ],
  "ConsentBanner",
]
