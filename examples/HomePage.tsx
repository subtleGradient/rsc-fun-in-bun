import { $ } from "bun"

export async function HomePage() {
  const uname = await $`uname -a`.text()
  return (
    <main>
      <h1>Hello, world!</h1>
      <pre>{uname}</pre>
    </main>
  )
}
