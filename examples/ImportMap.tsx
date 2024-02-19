export function ImportMap({ imports }: { imports: Record<string, string> }) {
  const source = JSON.stringify({ imports }, null, 2)
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
  return <script type="importmap" dangerouslySetInnerHTML={{ __html: source }} />
}
