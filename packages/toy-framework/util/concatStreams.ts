export function concatStreams<T>(...streams: ReadableStream<T>[]): ReadableStream<T> {
  return new ReadableStream<T>({
    async start(ccc) {
      using controller = Object.assign(ccc, { [Symbol.dispose]() { controller.close() } })
      for (const stream of streams) {
        using reader = Object.assign(stream.getReader(), { [Symbol.dispose]() { reader.releaseLock() } })

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }
      }
    },
  })
}
