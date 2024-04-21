export function createTransformStream(
  transformer: (chunk: Uint8Array) => Uint8Array,
): TransformStream<Uint8Array, Uint8Array> {
  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      // Apply the transformation function to each chunk
      const transformedChunk = transformer(chunk)
      // Enqueue the transformed chunk into the readable side of the stream
      controller.enqueue(transformedChunk)
    },
  })
}

export function createTextTransformStream(transformer: (chunk: string) => string): TransformStream<Uint8Array, Uint8Array> {
  const textDecoder = new TextDecoder()
  const textEncoder = new TextEncoder()

  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      // Decode the chunk to a string
      const textChunk = textDecoder.decode(chunk)
      // Apply the transformation function to the text chunk
      const transformedTextChunk = transformer(textChunk)
      // Encode the transformed text chunk back to Uint8Array and enqueue it
      controller.enqueue(textEncoder.encode(transformedTextChunk))
    },
  })
}
