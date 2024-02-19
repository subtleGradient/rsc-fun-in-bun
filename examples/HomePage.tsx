import { $ } from "bun"
import { doStuffOnTheServer_definedInClientCode } from "./example0.client"
import { doStuffOnTheServer } from "./example0.server"

export function HomePage() {
  return (
    <main>
      <h1>Hello, world!</h1>
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <Uname />
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <ServerCodeFromClient1 />
      {/* @ts-expect-error -- '() => Promise<Element>' is not a valid JSX element type */}
      <ServerCodeFromClient2 />
    </main>
  )
}

async function Uname() {
  const uname = await $`uname -a`.text()
  return <div>uname: {uname}</div>
}

async function ServerCodeFromClient1() {
  const stuff = await doStuffOnTheServer_definedInClientCode()
  return (
    <section>
      <h2>doStuffOnTheServer_definedInClientCode</h2>
      <div>
        <pre>{stuff}</pre>
      </div>
    </section>
  )
}

async function ServerCodeFromClient2() {
  const stuff = await doStuffOnTheServer()
  return (
    <section>
      <h2>doStuffOnTheServer</h2>
      <div>
        <pre>{stuff}</pre>
      </div>
    </section>
  )
}
