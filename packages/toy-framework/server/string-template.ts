import { define } from "./polyfillsAndStuff"

export const css = String.raw
export const ts = js
export const tsx = js
export const jsx = js

const TranspilerRef = { current: null as null | ((source: string) => string) }

function getTranspiler(): NonNullable<typeof TranspilerRef.current> {
  if (TranspilerRef.current) return TranspilerRef.current
  const transpiler = new Bun.Transpiler({
    target: "browser",
    allowBunRuntime: false,
    minifyWhitespace: false,
    inline: false,
    autoImportJSX: false,
    trimUnusedImports: false,
    deadCodeElimination: false,
    jsxOptimizationInline: false,
    treeShaking: false,
    loader: "js",

    define,
  })
  return (TranspilerRef.current = (source: string) => transpiler.transformSync(source, "js"))
}

export function js(strings: TemplateStringsArray, ...values: unknown[]) {
  let source = ""
  for (let i = 0; i < strings.length; i++) {
    source += strings[i]
    if (i < values.length) {
      const value = values[i]
      if (typeof value === "function") {
        const funSource = value.toString()
        // console.debug("funSource", funSource)
        // TODO: parse directives properly
        // if (funSource.match(/\buse transpiler\b/)) source += getTranspiler()(funSource)
        // else
        source += funSource
      } else source += typeof value === "string" ? value : JSON.stringify(value)
    }
  }
  return source
}

export function html(strings: TemplateStringsArray, ...values: unknown[]) {
  let source = ""
  for (let i = 0; i < strings.length; i++) {
    source += strings[i]
    if (i < values.length) {
      const value = values[i]
      source += typeof value === "function" ? value.toString() : value
    }
  }
  return source
}
