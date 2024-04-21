interface AcceptMediaType {
  type: string
  quality: number
}

/**
 * Parses the "Accept" HTTP header string to extract and sort media types based on their quality values.
 * The function splits the header into individual media type specifications, extracts their quality values (`q`),
 * and returns a sorted array of objects representing the media types and their associated quality, in descending order of preference.
 *
 * @param {string} acceptHeader The "Accept" header string from an HTTP request, containing comma-separated media type specifications,
 *                              each potentially followed by a `q` parameter indicating the relative quality factor.
 *
 * @returns {AcceptMediaType[]} An array of objects, each representing a media type and its quality. The array is sorted by quality,
 *                              from highest to lowest, to represent the client's preference order for response content types.
 *                              Each object has a `type` property, containing the media type string, and a `quality` property,
 *                              a number representing the quality factor (`q`) associated with that media type.
 *                              If no `q` value is specified for a media type, it defaults to 1.
 *
 * @example
 * // Parses an Accept header and returns sorted media types by quality
 * const acceptHeader = 'text/html,application/xhtml+xml,application/xml;q=0.9,flarm/*;q=0.8';
 * const parsedMediaTypes = parseAcceptHeader(acceptHeader);
 * console.log(parsedMediaTypes);
 * // Output might look like:
 * // [
 * //   { type: 'text/html', quality: 1 },
 * //   { type: 'application/xhtml+xml', quality: 1 },
 * //   { type: 'application/xml', quality: 0.9 },
 * //   { type: 'flarm/*', quality: 0.8 }
 * // ]
 */
export function parseAcceptHeader(acceptHeader?: null | string): AcceptMediaType[] {
  acceptHeader ||= "*/*"
  return acceptHeader
    .split(",")
    .map(part => {
      const [type, qValue] = part.split(";").map(item => item.trim())
      const quality = qValue ? parseFloat(qValue.split("=")[1]) : 1
      return { type, quality }
    })
    .sort((a, b) => b.quality - a.quality)
}

if (import.meta.main) {
  // Using the function
  const acceptHeader = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
  const parsedMediaTypes = parseAcceptHeader(acceptHeader)

  console.log(parsedMediaTypes)
}
