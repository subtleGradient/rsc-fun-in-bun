import React from "react"
import type { Pathname, RouteMap } from "../server/types"
import { LinkModulePreloads } from "./LinkModulePreloads"

export function HTMLPageRootLayout(props: { routes?: RouteMap; children?: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        <title>{`Hello from ${__filename.replace(__dirname, "")}`}</title>
        {props.routes && (
          <LinkModulePreloads pathnames={(Object.keys(props.routes) as Pathname[]).filter(it => it.endsWith(".mjs"))} />
        )}
      </head>
      <body>
        <h1>Hello from {__filename.replace(__dirname, "")}</h1>

        <div id="root">
          <div data-id="NOT-generated-by-client">
            pre-rendered by server in <code>{__filename.replace(__dirname, "")}</code>
          </div>
        </div>

        {props.children}
      </body>
    </React.StrictMode>
  )
}