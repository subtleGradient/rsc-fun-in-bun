import { $ } from "bun"
import { ImportMapScript } from "./ImportMap"

type ModuleID = string
type ModulePath = string
type ImportMapType = Record<ModuleID, ModulePath>

export const importMapReact: ImportMapType = {
  // "*": `https://esm.run/`,
  "*": "/",
  "react/jsx-dev-runtime": `/node_modules/react/cjs/react-jsx-dev-runtime.development.js`,
  "react/jsx-runtime": `/node_modules/react/cjs/react-jsx-runtime.development.js`,
  react: `/node_modules/react/cjs/react.development.js`,
  "react-dom": `/node_modules/react-dom/cjs/react-dom-server.browser.development.js`,
  "react-dom/client": `/node_modules/react-dom/client.js`,
  "react-server-dom-webpack/client": `/node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.browser.development.js`,
  // "react-server-dom-webpack/server.browser": `/node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-server.browser.development.js`,
}

/** @deprecated -- prefer `<ImportMap imports={importMapReact} />` instead */
export async function ImportMapCustom() {
  return <ImportMapScript imports={importMapReact} />
}

export async function ImportMapCustom_withRSC() {
  const map = {
    // "*": `https://esm.run/`,
    "*": "/",
    "react/jsx-dev-runtime": `/node_modules/react/cjs/react-jsx-dev-runtime.development.js`,
    "react/jsx-runtime": `/node_modules/react/cjs/react-jsx-runtime.development.js`,
    react: `/node_modules/react/cjs/react.react-server.development.js`,
    "react-dom": `/node_modules/react-dom/cjs/react-dom-server.browser.development.js`,
    "react-dom/client": `/node_modules/react-dom/client.js`,
    "react-server-dom-webpack/client": `/node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-client.browser.development.js`,
    "react-server-dom-webpack/server.browser": `/node_modules/react-server-dom-webpack/cjs/react-server-dom-webpack-server.browser.development.js`,
  }
  return <ImportMapScript imports={map} />
}

type npm_ls = { dependencies: { [key: string]: { version: string } } }

export async function ImportMap_viaESM() {
  const { dependencies } = (await $`npm ls react react-dom react-server-dom-webpack --json`.json()) as npm_ls
  const esm = (name: string) => `https://esm.run/${name}@${dependencies[name].version}`
  return (
    <ImportMapScript
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
