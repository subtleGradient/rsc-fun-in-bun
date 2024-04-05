/// <reference lib="dom" />
import React from "react"
import ReactDOM from "react-dom"
import ReactDOMClient from "react-dom/client"
import * as ReactServerDOMClient from "react-server-dom-webpack/client"
import JSX from "react/jsx-dev-runtime"
const { jsxDEV, Fragment } = JSX

Object.assign(window, { jsxDEV, Fragment, React, ReactDOM, ReactServerDOMClient })

console.log(React.version)

const container = document.getElementById("root")

declare global {
  interface Window {
    demo_reactPageRoot: ReactDOMClient.Root
  }
}

window.demo_reactPageRoot = ReactDOMClient.createRoot(container!)

function HomePage() {
  return (
    <div id="generated-by-client" suppressHydrationWarning>
      Hello from ClientComponent!
    </div>
  )
}

window.demo_reactPageRoot.render(<HomePage />)
