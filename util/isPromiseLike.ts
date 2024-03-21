export function isPromiseLike<T>(value: unknown): value is PromiseLike<T> {
  return value != null && typeof value === "object" && "then" in value && typeof value.then === "function"
}
