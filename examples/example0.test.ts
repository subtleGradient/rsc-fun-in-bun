import { describe, test } from "bun:test"

describe("file with 'use client' directive", async () => {
  test.todo("from client")
  test.todo("from server")

  describe("async function with 'use server' directive", async () => {
    test.todo("from client")
    test.todo("from server")
  })
})

describe("file with 'use server' directive", async () => {
  test.todo("from client")
  test.todo("from server")
})
