import { useId } from "react"
import { js } from "./js"

type Props = {
  src: string
  method: string
  props?: object
}

type ServerProps = Props & {
  Component: React.ComponentType
}

/** @deprecated -- this is silly :P */
export async function HydrateInnards({ Component, method, src: srcRaw, props }: ServerProps) {
  const id = useId()
  const src = new URL(srcRaw, import.meta.url).pathname

  const source = js`
    const { id, src, method, props } = ${{ id, src, method, props }}
    console.log("NOT hydrating (yet?)", { id, src, method, props })
    // import ReactDOMClient from "react-dom/client"
    // import React from "react"
    // window.jsxDEV = React.createElement
    // window.Fragment = React.Fragment
    // const { [method]: Component } = await import(src)

    // const script = document.getElementById(id)
    // const root = script.previousElementSibling
    // const children = React.createElement(Component, props)
    // console.log("hydrating", { src, method, props }, children, { script, root })
    // ReactDOMClient.hydrateRoot(root, children)
  `

  return (
    <>
      <div>
        <Component {...props} />
      </div>
      <script id={id} type="module" dangerouslySetInnerHTML={{ __html: source }} />
    </>
  )
}
