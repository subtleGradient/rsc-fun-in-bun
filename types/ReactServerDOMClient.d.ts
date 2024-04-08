// so you can quick jump to the code
if (!1!) import("../node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.browser.development.js")

declare module "react-server-dom-webpack/client" {
  import type { Thenable } from "react"
  /**
   * A Wakeable is a value that can be awaited.
   */
  interface Wakeable {
    then(onFulfill: () => mixed, onReject: () => mixed): void | Wakeable
  }

  /**
   * A ReactServerValue is a value that can be serialized from the server to the client.
   */
  type ReactServerValue =
    | string
    | boolean
    | number
    | null
    | void
    | bigint
    | Iterable<ReactServerValue>
    | Array<ReactServerValue>
    | Map<ReactServerValue, ReactServerValue>
    | Set<ReactServerValue>
    | FormData
    | Date
    | ReactServerObject
    | Promise<ReactServerValue>

  /**
   * A ReactServerObject is a plain object that can be serialized from the server to the client.
   */
  type ReactServerObject = { [key: string]: ReactServerValue }

  /**
   * A ReactCustomFormAction is an object that describes a custom form action.
   */
  type ReactCustomFormAction = {
    name?: string
    action?: string
    encType?: string
    method?: string
    target?: string
    data?: null | FormData
  }

  /**
   * A TemporaryReferenceSet is a set of temporary references that can be used to pass
   * React Elements from the server to the client.
   */
  type TemporaryReferenceSet = Array<unknown | symbol>

  /**
   * A CallServerCallback is a function that is used to call a server function from the client.
   */
  type CallServerCallback = <A, T>(id: any, args: A) => Promise<T>

  /**
   * A EncodeFormActionCallback is a function that is used to encode a form action.
   */
  type EncodeFormActionCallback = <A>(id: any, args: Promise<A>) => ReactCustomFormAction

  /**
   * A ServerReferenceId is a unique identifier for a server reference.
   */
  type ServerReferenceId = any

  /**
   * A SSRModuleMap is a map of client module IDs to their corresponding exports.
   */
  type SSRModuleMap = {
    [clientId: string]: {
      [clientExportName: string]: ClientReferenceManifestEntry
    }
  }

  /**
   * A ClientReferenceManifestEntry is a map of client module IDs to their corresponding exports.
   */
  type ClientReferenceManifestEntry = {
    id: string
    // chunks is a double indexed array of chunkId / chunkFilename pairs
    chunks: Array<string>
    name: string
  }

  /**
   * A ClientManifest is a map of client module IDs to their corresponding manifest entries.
   */
  type ClientManifest = {
    [id: string]: ClientReferenceManifestEntry
  }

  /**
   * A ModuleLoading is a description of how to load modules.
   */
  type ModuleLoading = {
    prefix: string
    crossOrigin?: "use-credentials" | ""
  }

  /**
   * A SSRManifest is a manifest of server-rendered modules.
   */
  type SSRManifest = {
    moduleMap: SSRModuleMap
    moduleLoading: ModuleLoading
  }

  /**
   * A ServerReference is a reference to a server-side function.
   */
  type ServerReference<T extends Function> = T & {
    $$typeof: symbol
    $$id: string
    $$bound: null | Array<ReactServerValue>
  }

  /**
   * A ClientReference is a reference to a client-side function.
   */
  type ClientReference<T> = {
    $$typeof: symbol
    $$id: string
    $$async: boolean
  }

  /**
   * Options for `createFromFetch`.
   */
  type FromFetchOptions = {
    /**
     * Callback for making server calls.
     */
    callServer?: CallServerCallback

    /**
     * In the context of react-server-dom-webpack/client,
     * the {@link createFromFetch} function is designed for client-side rendering of RSC responses that are fetched from a server.
     * It does not utilize the {@link FromReadableStreamOptions.ssrManifest} option
     * because createFromFetch assumes the response already contains all necessary module information and chunks.
     */
    ssrManifest?: never

    /**
     * A nonce to be used for any scripts that are injected.
     */
    nonce?: string

    /**
     * A callback that is used to encode a form action.
     */
    encodeFormAction?: EncodeFormActionCallback

    /**
     * A set of temporary references that can be used to pass
     * React Elements from the server to the client.
     */
    temporaryReferences?: TemporaryReferenceSet
  }

  /**
   * Options for `createFromReadableStream`.
   */
  type FromReadableStreamOptions = {
    /**
     * Here's why callServer is not relevant in this context:
     * {@link createFromReadableStream} is designed for situations where you already have the full Flight response available as a ReadableStream.
     * This means that all the necessary data, including any server-rendered components and their props, is already present in the stream.
     *
     * There's no need to make additional calls to the server to fetch data or execute server-side logic
     * because everything required to render the components on the client is already included in the stream.
     */
    callServer?: never
    /**
     * The SSR manifest.
     */
    ssrManifest: SSRManifest
    /**
     * A nonce to be used for any scripts that are injected.
     */
    nonce?: string
    /**
     * A callback that is used to encode a form action.
     */
    encodeFormAction?: EncodeFormActionCallback
    /**
     * A set of temporary references that can be used to pass
     * React Elements from the server to the client.
     */
    temporaryReferences?: TemporaryReferenceSet
  }

  /**
   * Creates a new set of temporary references.
   *
   * @returns A new set of temporary references.
   */
  function createTemporaryReferenceSet(): TemporaryReferenceSet

  /**
   * Creates a server reference.
   *
   * @param id The ID of the server reference.
   * @param callServer A callback that is used to call the server reference.
   * @returns A server reference.
   */
  function createServerReference<A extends Iterable<any>, T>(id: any, callServer: CallServerCallback): (...A) => Promise<T>

  /**
   * Creates a Thenable that resolves to the model of the root component.
   *
   * @param stream A readable stream that contains the Flight response.
   * @param options Options for the Flight client.
   * @returns A Thenable that resolves to the model of the root component.
   */
  function createFromReadableStream<T>(stream: ReadableStream, options?: FromReadableStreamOptions): Thenable<T>

  /**
   * Creates a Thenable that resolves to the Server Component tree.
   *
   * @param {Promise<Response>} promiseForResponse A Promise that resolves to the Response object from the server.
   * @param {FromFetchOptions} [options] Optional configuration options.
   * @returns {Thenable<T>} A Thenable that resolves to the Server Component tree.
   *
   * @remarks
   * This function does not allow passing an `ssrManifest` option like some other Flight implementations.
   *
   * The necessary module resolution and chunk loading information is automatically handled by the `ReactFlightWebpackPlugin`
   * during the Webpack build process. Ensure that the plugin is configured in your Webpack setup and that the paths
   * and filenames of the generated manifest files match the expectations of your Flight client and server code.
   */
  function createFromFetch<T>(promiseForResponse: Promise<Response>, options?: FromFetchOptions): Thenable<T>

  /**
   * Encodes a React element tree into a Flight response.
   *
   * @param value The React element tree to encode.
   * @param options Options for the Flight client.
   * @returns A Promise that resolves to the encoded Flight response.
   */
  function encodeReply(
    value: ReactServerValue,
    options?: { temporaryReferences?: TemporaryReferenceSet },
  ): Promise<string | URLSearchParams | FormData>

  export { createFromFetch, createFromReadableStream, createServerReference, createTemporaryReferenceSet, encodeReply }
}
