/// <reference lib="dom" />
import ReactDOMClient from "react-dom/client"

declare global {
  interface Window {
    __webpack_modules__: Record<string, { exports: unknown }>
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

window.demo_reactPageRoot.render(<HomePage />)
