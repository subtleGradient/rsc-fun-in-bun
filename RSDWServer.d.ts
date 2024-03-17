// so you can quick jump to the code
if (!1!) import("./node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-server.node.development.js")

declare module "react-server-dom-webpack/server" {
  import { Readable } from "stream"

  type BundlerConfig = any // Placeholder type for Bundler Config
  type ServerComponentResponse = any // Placeholder type for Server Component Response
  type ErrorHandler = (error: Error) => void
  type IdentifierPrefix = string
  type EnvironmentName = string
  type OnPostponeHandler = (reason?: any) => void
  type Model = any // Placeholder for model data type

  /**
   * Options for rendering to a pipeable stream.
   */
  interface RenderToPipeableStreamOptions {
    onError?: ErrorHandler
    identifierPrefix?: IdentifierPrefix
    onPostpone?: OnPostponeHandler
    environmentName?: EnvironmentName
  }

  /**
   * Result of rendering to a pipeable stream.
   */
  interface PipeableStream {
    pipe: (destination: Writable) => Writable
    abort: (reason: string) => void
  }

  /**
   * Represents an action result.
   */
  type ActionResult = any // Placeholder for action result type

  /**
   * Represents a form data body.
   */
  type FormDataBody = any // Placeholder for form data body type

  /**
   * Decode action from a form data body.
   * @param body Form data body.
   * @param serverManifest Server manifest for module resolution.
   */
  export function decodeAction(body: FormDataBody, serverManifest: BundlerConfig): Promise<((...args: any[]) => any) | null>

  /**
   * Decodes form state and returns relevant information.
   * @param actionResult The result of the action.
   * @param body The body of the form.
   * @param serverManifest The server manifest.
   */
  export function decodeFormState(
    actionResult: ActionResult,
    body: FormDataBody,
    serverManifest: BundlerConfig,
  ): Promise<[ActionResult, string, string, number] | null>

  /**
   * Decodes a reply from a busboy stream.
   * @param busboyStream The busboy stream containing the form data.
   * @param webpackMap The webpack map for module resolution.
   */
  export function decodeReplyFromBusboy(busboyStream: Readable, webpackMap: BundlerConfig): Promise<ServerComponentResponse>

  /**
   * Decodes a reply from a form submission.
   * @param body The body of the form.
   * @param webpackMap The webpack map for module resolution.
   */
  export function decodeReply(body: FormDataBody, webpackMap: BundlerConfig): Promise<ServerComponentResponse>

  /**
   * Creates a proxy for a client module.
   * @param moduleId The module ID.
   */
  export function createClientModuleProxy(moduleId: string): any

  /**
   * Registers a client-side reference.
   * @param proxyImplementation The proxy implementation.
   * @param id The ID of the module.
   * @param exportName The name of the export.
   */
  export function registerClientReference(proxyImplementation: any, id: string, exportName: string): void

  /**
   * Registers a server-side reference.
   * @param reference The reference.
   * @param id The ID of the module.
   * @param exportName The name of the export.
   */
  export function registerServerReference(reference: any, id: string, exportName: string | null): void

  /**
   * Renders a React component to a pipeable stream.
   * @param model The model to render.
   * @param webpackMap The webpack map for module resolution.
   * @param options Options for rendering.
   */
  export function renderToPipeableStream(
    model: Model,
    webpackMap: BundlerConfig,
    options?: RenderToPipeableStreamOptions,
  ): PipeableStream
}
