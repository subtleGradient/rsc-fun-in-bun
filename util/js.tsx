export const ts = js
export const tsx = js
export const jsx = js
export function js(strings: TemplateStringsArray, ...values: unknown[]) {
  let source = ""
  for (let i = 0; i < strings.length; i++) {
    source += strings[i]
    if (i < values.length) {
      const value = values[i]
      source += typeof value === "function" ? value.toString() : typeof value === "string" ? value : JSON.stringify(value)
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
