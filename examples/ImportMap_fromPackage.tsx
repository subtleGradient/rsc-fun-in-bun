import { $ } from "bun"
import { ImportMap } from "./ImportMap"

export async function ImportMap_fromPackage() {
  const react = await $`npm ls react --json`.json()
  const react_dom = await $`npm ls react-dom --json`.json()
  const CDN = "https://cdn.skypack.dev"
  return (
    <ImportMap
      imports={{
        react: `${CDN}/react@${react.dependencies.react.version}`,
        "react-dom": `${CDN}/react-dom@${react_dom.dependencies["react-dom"].version}`,
      }}
    />
  )
}
