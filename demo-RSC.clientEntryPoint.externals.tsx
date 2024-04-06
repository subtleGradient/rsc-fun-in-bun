/// <reference lib="dom" />
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMClient from "react-dom/client"
import * as ReactServerDOMClient from "react-server-dom-webpack/client"
import { jsxDEV } from "react/jsx-dev-runtime"
import { Fragment, jsx } from "react/jsx-runtime"

declare global {
  interface Window {
    __NOT__webpack_modules__: Record<string, { exports: unknown }>
  }
}

const { __NOT__webpack_modules__ } = window

__NOT__webpack_modules__["react"] = { exports: React }
__NOT__webpack_modules__["react-dom"] = { exports: ReactDOM }
__NOT__webpack_modules__["react-dom/client"] = { exports: ReactDOMClient }
__NOT__webpack_modules__["react-server-dom-webpack/client"] = { exports: ReactServerDOMClient }
__NOT__webpack_modules__["react/jsx-dev-runtime"] = { exports: { jsxDEV, Fragment } }
__NOT__webpack_modules__["react/jsx-runtime"] = { exports: { jsxDEV, Fragment } }

Object.assign(window, { jsx, jsxDEV, Fragment })
Object.assign(window, { React, ReactDOM, ReactServerDOMClient })

console.log("React", React.version)
