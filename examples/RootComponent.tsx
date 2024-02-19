import React from "react"
import { ImportMap_fromPackage } from "./ImportMap_fromPackage"

export function RootComponent({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        <ImportMap_fromPackage />
      </head>

      <>{children}</>
    </React.StrictMode>
  )
}
