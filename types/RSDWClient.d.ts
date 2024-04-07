// so you can quick jump to the code
if (!1!) import("../node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.browser.development.js")

declare module "react-server-dom-webpack/client" {
  export function createFromFetch(promiseForResponse: Promise<Response>, options?: Options): Root
  export function createFromReadableStream(stream: ReadableStream<Uint8Array>, options?: Options): Root
  export function createServerReference(
    id: number,
    callServer: CallServerFunction,
    encodeFormAction: EncodeFormActionFunction,
  ): ServerReference
  export function encodeReply(value: unknown): Promise<EncodedReply>

  // Types and interfaces
  type Options = {
    callServer?: CallServerFunction
  }

  type Root = any // Placeholder, adjust according to the actual implementation

  type ServerReference = any // Placeholder, adjust according to the actual implementation

  type CallServerFunction = (id: number, args: any[]) => any // Adjust return type based on actual usage

  type EncodeFormActionFunction = (action: string, method: string, values: any) => string // Adjust according to actual implementation

  type EncodedReply = string // Assuming a string is returned; adjust if needed

  // Example of extending definitions with additional functions or types can go here...
}
