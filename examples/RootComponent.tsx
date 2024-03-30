import React from "react"
import { ImportMapCustom } from "./ImportMap_fromPackage"

export function RootComponent({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        <ImportMapCustom />
      </head>

      <>{children}</>
    </React.StrictMode>
  )
}
