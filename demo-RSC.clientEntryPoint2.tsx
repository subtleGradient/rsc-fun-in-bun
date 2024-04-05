import { useEffect } from "react"

export default function ClientComponent() {
  useEffect(() => {
    console.log("Hello from ClientComponent!")
  })
  return <div id="generated-by-client">Hello from ClientComponent!</div>
}
