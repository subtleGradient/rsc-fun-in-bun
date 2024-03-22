import { verifyReactServer } from "./verify-react-server"

console.log("Hello via Bun!")
console.debug("executing", import.meta.url)
console.debug(process.argv)

verifyReactServer()
