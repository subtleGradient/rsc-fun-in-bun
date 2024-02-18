# rsc-fun-in-bun "toy" project

## TODO: High level subjective goals

- [ ] Understand what the heck "RSC" actually is and how it works
- [ ] Build a toy implementation of something vaguely RSC-ish, that runs in bun.sh
- [ ] build a library compatible with RSC
- [ ] get added to [the list of Bleeding-edge React frameworks](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks)

## TODO: low level concrete goals

- [ ] toy supports "use client" at the top of a file
- [ ] toy supports "use server" at the top of a file
- [ ] toy supports "use server" at the top of an async function

### TODO: concrete tasks (motion, not progress)

Think & plan

- [x] bad first draft of document "use client"
- [x] bad first draft of document "use server"
- [x] bad first draft of document RSC
- [x] bad first draft of a plan

Build stuff

- [x] create a example "use client" file
- [x] create a example "use server" async function
- [x] create a example "use server" file
- [x] toy tests can be run with `bun test`
- [x] create a toy example project
- [x] add ReactDOM.renderToReadableStream
- figure out what to do next, add more tasks
- see [example0 tests](examples/example0.test.ts) for further concrete stuff being built

---

# context

## client vs server environments

Historically, there used to just be computers. You were either directly accessing that computer or else remotely accessing it. Eventually we abstracted away a lot of the details and started calling the remote access "the server" and the direct access "the client". All the client stuff is focused on interfacing with the end user. All the server stuff is focused on providing services to the client. e.g. web servers, file servers, database servers, etc.

### the client environment

Typically a web browser, but could be any JavaScript runtime that does not have priviledged access to stuff like the file system.

#### Client environments:

- web browser
- web browser iframe
- WebView in a mobile app
- web worker
- React Native runtime
- Adobe ExtendScript runtime (for Adobe Creative Cloud apps)
- JXA (JavaScript for Automation) in macOS
- JScript in Windows Script Host
- etc.

### the server environment

Typically a Node.js runtime, but could be any JavaScript runtime that does have priviledged access to stuff like the file system.

## "use client"

[React "use client" docs](https://react.dev/reference/react/use-client)

## "use server"

[React "use server" docs](https://react.dev/reference/react/use-server)

## What the heck is RSC?

RSC (React Server Components) is a fun new way to build apps using a single mental model. You can encapsulate a lot of complexity into components that can then snapped together like legos.

Encapsulation of complexity is my favorite aspect of this new tech.

---

# The Plan

Create a [Bun loader plugin](https://bun.sh/docs/runtime/plugins#loaders) that does something fancy to make "use client" and "use server" work.

## does something fancy?

---

## bun

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run rsc-fun-in-bun.ts
```

This project was created using `bun init` in bun v1.0.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## The "MIT No Attribution" (MIT-0) License

This project is licensed under the MIT No Attribution License. See the [LICENSE](LICENSE) file for details.
