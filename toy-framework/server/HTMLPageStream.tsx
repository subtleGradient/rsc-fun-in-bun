import { arrayToStream } from "#util/util/arrayToStream.ts"
import { concatStreams } from "#util/util/concatStreams.ts"
import React from "react"
import ReactDOMServer from "react-dom/server"
import { HTMLPageRootLayout } from "../client/HTMLPageRootLayout"
import { ImportMapScript } from "../client/ImportMap"
import { clientEntryPointBundle } from "./clientEntryPointBundle"
import { externalsBundle } from "./externalsBundle"
import { polyfillsAndStuff } from "./polyfillsAndStuff"
import { routes } from "./toy-framework.server"

/**
 * TODO: simplifty this once renderToReadableStream HEAD sorting is fixed
 *
 * The importMap script needs to be loaded before the modulepreload
 * But {@link React.version} 19.0.0-canary-e3ebcd54b-20240405 keeps moving the modulepreload above the importMap script
 * so this is a workaround for now
 */
export async function HTMLPageStream({ children }: { children?: React.ReactNode }) {
  // ideally this would just be a single call to renderToReadableStream
  return concatStreams(
    arrayToStream(`<!DOCTYPE HTML><HTML lang=en>`),
    await ReactDOMServer.renderToReadableStream(
      <ImportMapScript
        imports={{
          ...externalsBundle.importMap,
          ...clientEntryPointBundle.importMap,
        }}
      />,
    ),
    await ReactDOMServer.renderToReadableStream(
      <HTMLPageRootLayout routes={routes}>
        <script src={polyfillsAndStuff.name} />
        <script type="module" src={externalsBundle.name!} />
        <script type="module" src={clientEntryPointBundle.name!} />
        {children}
      </HTMLPageRootLayout>,
    ),
    arrayToStream(`</HTML>`),
  )
}
