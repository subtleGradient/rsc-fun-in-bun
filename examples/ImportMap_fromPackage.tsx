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
        'react/jsx-dev-runtime': '/node_modules/react/cjs/react-jsx-dev-runtime.development.js', // requires a server
        'react/jsx-runtime': '/node_modules/react/cjs/react-jsx-runtime.development.js', // requires a server
        // react: `https://cdn.jsdelivr.net/npm/react@${dependencies.react.version}/umd/react.development.\js/+esm`,
        // react: esm("react"),
        react: '/node_modules/react/cjs/react.development.js',
        "react-dom": `${esm("react-dom")}/cjs/react-dom.development.\js`,
        "react-dom/client": `${esm("react-dom")}/client`,
        "react-server-dom-webpack/client": esm("react-server-dom-webpack") + `/client`,
        // "react-server-dom-webpack/client": "/examples/react-server-dom-webpack-client.browser.development.js",
      }}
    />
  )
}
