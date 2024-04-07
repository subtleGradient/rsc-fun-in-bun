/// <reference lib="dom" />
import React from "react"
import ReactDOMClient from "react-dom/client"

declare global {
  interface Window {
    demo_reactPageRoot: ReactDOMClient.Root
  }
}

const container = document.getElementById("root")
window.demo_reactPageRoot = ReactDOMClient.createRoot(container!)

function HomePage() {
  return (
    <div id="generated-by-client" suppressHydrationWarning>
      Hello from ClientComponent!
    </div>
  )
}

window.demo_reactPageRoot.render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
)
