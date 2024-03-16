export function js(strings: TemplateStringsArray, ...values: unknown[]) {
  let source = ""
  for (let i = 0; i < strings.length; i++) {
    source += strings[i]
    if (i < values.length) {
      const value = values[i]
      source += typeof value === "function" ? value.toString() : JSON.stringify(value)
    }
  }
  return source
}
