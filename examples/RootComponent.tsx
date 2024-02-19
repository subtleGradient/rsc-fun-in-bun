import React from "react"
import { ImportMap_fromPackage } from "./ImportMap_fromPackage"

export function RootComponent({ children }: { children: React.ReactNode }) {
  return (
    <React.StrictMode>
      <head>
        {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
        <ImportMap_fromPackage />
      </head>

      <>{children}</>
    </React.StrictMode>
  )
}
