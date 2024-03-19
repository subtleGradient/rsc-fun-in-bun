export function arrayToStream(...strings: string[]): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      strings.forEach(str => {
        // Convert each string to a Uint8Array and enqueue it
        controller.enqueue(new TextEncoder().encode(str))
      })
      controller.close() // Close the stream after enqueuing all strings
    },
  })
}
