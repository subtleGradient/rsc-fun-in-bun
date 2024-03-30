import { $ } from "bun"
import { ImportMap } from "./ImportMap"

export async function ImportMapCustom() {
  const root = '/node_modules/'
  const map = {
    // "*": `https://esm.run/`,
    "react/jsx-dev-runtime": `${root}react/cjs/react-jsx-dev-runtime.development.js`,
    "react/jsx-runtime": `${root}react/cjs/react-jsx-runtime.development.js`,
    react: `${root}react/cjs/react.development.js`,
    "react-dom": `${root}react-dom/cjs/react-dom.development.js`,
    "react-dom/client": `${root}react-dom/cjs/react-dom-client.browser.development.js`,
    "react-server-dom-webpack/client": `${root}react-server-dom-webpack/cjs/react-server-dom-webpack-client.browser.development.js`,
    "react-server-dom-webpack/server.browser": `${root}react-server-dom-webpack/cjs/react-server-dom-webpack-server.browser.development.js`,
  }
  return <ImportMap imports={map} />
}

type npm_ls = { dependencies: { [key: string]: { version: string } } }

export async function ImportMap_viaESM() {
  const { dependencies } = (await $`npm ls react react-dom react-server-dom-webpack --json`.json()) as npm_ls
  const esm = (name: string) => `https://esm.run/${name}@${dependencies[name].version}`
  return (
    <ImportMap
      imports={{
        "*": `https://esm.run/`,
        react: esm("react"),
        "react-dom": `${esm("react-dom")}/cjs/react-dom.development.\js`,
        "react-dom/client": `${esm("react-dom")}/client`,
        "react-server-dom-webpack/client": esm("react-server-dom-webpack") + `/client`,
        "react-server-dom-webpack/server.browser": esm("react-server-dom-webpack") + `/server.browser`,
      }}
    />
  )
}
