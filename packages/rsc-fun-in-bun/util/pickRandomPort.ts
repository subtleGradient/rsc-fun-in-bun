/** returns a random number between 3000 and 7000 that is not already in use */
export async function pickRandomPort(min = 3000, max = 7000): Promise<number> {
  const port = Math.floor(Math.random() * (max - min)) + min
  const isPortAvailable = await isServerPortAvailable(port)
  return isPortAvailable ? port : await pickRandomPort()
}
function isServerPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    try {
      const server = Bun.serve({ port, fetch: () => new Response("Hello!") })
      server.stop(true)
      resolve(true) // available
    } catch (error) {
      resolve(false) // not available
    }
  })
}
