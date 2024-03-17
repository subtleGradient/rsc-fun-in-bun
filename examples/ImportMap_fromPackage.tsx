import { $ } from "bun"
import { ImportMap } from "./ImportMap"

type npm_ls = { dependencies: { [key: string]: { version: string } } }

export async function ImportMap_fromPackage() {
  const { dependencies } = (await $`npm ls react react-dom react-server-dom-webpack --json`.json()) as npm_ls
  const esm = (name: string) => `https://esm.run/${name}@${dependencies[name].version}`
  return (
    <ImportMap
      imports={{
        "*": `https://esm.run/`,
        react: esm("react"),
        "react-dom": `${esm("react-dom")}/cjs/react-dom.development.\js`,
        "react-dom/client": `${esm("react-dom")}/client`,
        "react-server-dom-webpack/client":
          esm("react-server-dom-webpack") + `/cjs/react-server-dom-webpack-client.development.\js`,
      }}
    />
  )
}
