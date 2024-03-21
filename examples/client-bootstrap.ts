/// <reference lib="dom" />

import React from "react"
import ReactDOM from "react-dom/client"
import * as RSDWClient from "react-server-dom-webpack/client"

console.log("Client bootstrap", React.version)

declare global {
  interface Window {
    __RSC?: string[] & { push(chunk: string): void }
  }
}

const rscReadableStream = new ReadableStream({
  start(controller) {
    // const self = window.top ?? window.self // TODO: think about iframe support maybe?
    const textEncoder = new TextEncoder()

    const { __RSC: rsc } = self
    self.__RSC = undefined

    if (rsc) {
      console.log("RSC__", "start", rsc)
      for (const chunk of rsc) {
        console.log("RSC__", "start", "enqueue", chunk)
        controller.enqueue(textEncoder.encode(chunk))
      }
    }

    self.__RSC = Object.assign([], {
      push(data: string) {
        console.log("RSC__", "push", data)
        controller.enqueue(textEncoder.encode(data))
      },
    })
  },
})

const ui = RSDWClient.createFromReadableStream(rscReadableStream, {
  callServer(id, args) {
    console.log("RSDWClient.createFromReadableStream", "callServer", id, args)
  },
})

ReactDOM.createRoot(document.getElementById("root")!).render(ui)
