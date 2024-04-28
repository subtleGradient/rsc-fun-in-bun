declare module "react/jsx-runtime" {
  import { Fragment, JSX, jsxDEV, JSXSource } from "react/jsx-dev-runtime"
  const jsx = jsxDEV
  export { Fragment, JSX, JSXSource, jsx, jsxDEV }
}
