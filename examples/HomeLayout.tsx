import * as React from "react"

export async function HomeLayout({ children }: { children: React.ReactNode | Promise<React.ReactNode> }) {
  return (
    <html>
      <head>
        <title>hi</title>
      </head>
      <body>{await children}</body>
    </html>
  )
}
