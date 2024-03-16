import { $ } from "bun"
import { ImportMap } from "./ImportMap"

export async function ImportMap_fromPackage() {
  const react = await $`npm ls react --json`.json()
  const react_dom = await $`npm ls react-dom --json`.json()
  return (
    <ImportMap
      imports={{
        "*": `https://cdn.jsdelivr.net`,
        // react: `https://cdn.jsdelivr.net/npm/react@${react.dependencies.react.version}/react.react-server.js/+esm`,
        // "": "https://cdn.jsdelivr.net/npm/react@react.dependencies.react.version/jsx-dev-runtime.min.js",
        react: `https://cdn.jsdelivr.net/npm/react@${react.dependencies.react.version}/+esm`,
        "react-dom": `https://cdn.jsdelivr.net/npm/react-dom@${react_dom.dependencies["react-dom"].version}/react-dom.react-server.js/+esm`,
        "react-dom/client": `https://cdn.jsdelivr.net/npm/react-dom@${react_dom.dependencies["react-dom"].version}/client/+esm`,
      }}
    />
  )
}
