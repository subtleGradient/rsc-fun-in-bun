export function concatStreams<T>(...streams: ReadableStream<T>[]): ReadableStream<T> {
  return new ReadableStream<T>({
    async start(controller) {
      for (const stream of streams) {
        const reader = stream.getReader()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          controller.enqueue(value)
        }

        // Close the current reader to ensure it's no longer in use before moving to the next stream
        reader.releaseLock()
      }
      controller.close()
    },
  })
}
