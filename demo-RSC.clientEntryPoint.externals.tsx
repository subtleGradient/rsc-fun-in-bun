/// <reference lib="dom" />
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMClient from "react-dom/client"
import * as ReactServerDOMClient from "react-server-dom-webpack/client"
import JSX from "react/jsx-dev-runtime"
const { jsxDEV, Fragment } = JSX

declare global {
  interface Window {
    __webpack_modules__: Record<string, { exports: unknown }>
    __webpack_require__: { (id: string): unknown; m: any; c: any; d: any; n: any; o: any; p: any; s: any }
    require: ((moduleId: string) => unknown) & unknown
    demo_reactPageRoot: ReactDOMClient.Root
  }
}

window.__webpack_modules__ ??= {}
const { __webpack_modules__ } = window

__webpack_modules__["react"] = { exports: React }
__webpack_modules__["react-dom"] = { exports: ReactDOM }
__webpack_modules__["react-dom/client"] = { exports: ReactDOMClient }
__webpack_modules__["react-server-dom-webpack/client"] = { exports: ReactServerDOMClient }
__webpack_modules__["react/jsx-dev-runtime"] = { exports: { jsxDEV, Fragment } }

Object.assign(window, { jsxDEV, Fragment, React, ReactDOM, ReactServerDOMClient })

console.log("React", React.version)
