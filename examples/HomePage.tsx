import { $ } from "bun"
import { Timer } from "./Timer.client"
import { doStuffOnTheServer_definedInClientCode } from "./example0.client"
import { doStuffOnTheServer } from "./example0.server"
console.debug("executing", import.meta.url)

export function HomePage() {
  return (
    <main>
      <h1>Hello, world!</h1>
      <h2>
        <Timer />
      </h2>

      <Uname />
      <ServerCode_fromUseClientFile />
      <ServerCode_fromUseServerFile />
    </main>
  )
}

async function Uname() {
  const uname = await $`uname -a`.text()
  return <div>uname: {uname}</div>
}

async function ServerCode_fromUseClientFile() {
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

async function ServerCode_fromUseServerFile() {
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
