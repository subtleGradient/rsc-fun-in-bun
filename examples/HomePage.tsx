import { $ } from "bun"

export function HomePage() {
  return (
    <main>
      <h1>Hello, world!</h1>
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <Uname />
    </main>
  )
}

async function Uname() {
  const uname = await $`uname -a`.text()
  return <div>{uname}</div>
}
