if (!1!) import("../node_modules/react-dom/server")

if (!1!) import("../node_modules/react-dom/server.browser")
declare module "react-dom/server.browser" {
  export * from "react-dom/server"
}

if (!1!) import("../node_modules/react-dom/server.bun")
if (!1!) import("../node_modules/react-dom/cjs/react-dom-server.bun.development.js")
if (!1!) import("../node_modules/react-dom/cjs/react-dom-server-legacy.browser.development.js")

declare module "react-dom/server.bun" {
  export * from "react-dom/server"
}

if (!1!) import("../node_modules/react-dom/server.edge")
declare module "react-dom/server.edge" {
  export * from "react-dom/server"
}

if (!1!) import("../node_modules/react-dom/server.node")
declare module "react-dom/server.node" {
  export * from "react-dom/server"
}
