import React from "react"
import { HTMLPageRootLayout } from "../client/HTMLPageRootLayout"
import { ImportMapScript } from "../client/ImportMap"
import { arrayToStream } from "../util/arrayToStream"
import { concatStreams } from "../util/concatStreams"
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
 *
 * @deprecated -- ReactDOMServer does not work in react-server anymore
 */
export async function HTMLPageStream__BROKEN_IN_REACT_SERVER_19BETA({ children }: { children?: React.ReactNode }) {
  // FIXME(@subtleGradient): ReactDOMServer doesn't work in react-server
  const ReactDOMServer = await import("react-dom/server")

  const importMap = {
    ...externalsBundle.importMap,
    ...clientEntryPointBundle.importMap,
  }
  // ideally this would just be a single call to renderToReadableStream
  return concatStreams(
    arrayToStream(`<!DOCTYPE HTML><HTML lang=en>`),
    await ReactDOMServer.renderToReadableStream(<ImportMapScript imports={importMap} />),
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
