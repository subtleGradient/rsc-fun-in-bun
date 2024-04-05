# rsc-fun-in-bun "toy" project

---

as of April 2024, start here:

[demo-RSC.server.tsx](./demo-RSC.server.tsx)

eventually I'll make all this stuff work in the following tests

[demo-RSC.server.test.tsx](./demo-RSC.server.test.tsx)

```sh
PUPPETEER_HEADLESS=true bun test demo-RSC.server.test.tsx
```

---

# v2 -- March 2024

- [x] understand RSC
- [ ] explain RSC by example
- [ ] make it easy to use RSC in bun for personal toy projects

---

<details>

<summary>TODO (v2)</summary>

- [ ] maybe figure out how to pull stuff from https://react-builds.vercel.app/ for stuff that isn't in npm

## import anything anywhere

### server components everywhere

- create a react server component
- import it on the server, it composes with other server components
- import it on the client, it composes with other client components

Importing server components on the client is not part of the React spec. This is a new feature that I am experimenting with.

### client components everywhere

- create a client component
- import it on the server, it composes with other server components
- import it on the client, it composes with other client components

### server actions everywhere

[Calling a Server Action](https://react.dev/reference/react/use-server#calling-a-server-action-outside-of-form)

**What is a server action?** A server action is a function that can be called from the client, runs on the server, then returns a value to the client.

- create a server action
- import it on the server, it is callable like any other server function
- import it on the client, it is callable like any other client function

### client actions everywhere

Client Actions are not part of the React spec. This is a new feature that I am proposing.

**What is a client action?** It's just like a server action, but in reverse. A client action is a function that can be called from the server, runs on the client, then returns a value to the server.

**Why would I want client actions?** 🤷‍♂️ Wacky shennanigans? I dunno

- create a client action
- import it on the server, it is callable like any other server function
- import it on the client, it is callable like any other client function

### dynamic client components

This is not part of the React spec. This is a new feature that I am experimenting with.

What if the server could compose virtual components that don't literally exist in the server repo. Then on the client, the virtual components could be resolved to real components based on the client's environment.

For example, the server could compose a "Button" component that is a virtual component. Then on the client, the virtual "Button" component could be resolved to a real "Button" component that is specific to the client's environment. e.g. a web browser button, a mobile app button, etc.

### p2p components

### React Native portals

### React Native Server Components RNSC? RSC-Native? Native-RSC?

### Swift-backed React Server Components

### Kotlin-backed React Server Components

### micro-frontends

This is not part of the React spec. This is a new feature that I am experimenting with.

What if we could compose entire micro-apps together like we do with components?

</details>

---

<details>

<summary>TODO (v1)</summary>

## TODO: High level subjective goals

- [x] Understand what the heck "RSC" actually is and how it works
- [ ] Build a toy implementation of something vaguely RSC-ish, that runs in bun.sh
- [ ] build a library compatible with RSC
- [ ] get added to [the list of Bleeding-edge React frameworks](https://react.dev/learn/start-a-new-react-project#bleeding-edge-react-frameworks)

## TODO: low level concrete goals

- [ ] toy supports "use client" at the top of a file
- [ ] toy supports "use server" at the top of a file
- [ ] toy supports "use server" at the top of an async function

### TODO: concrete tasks (motion, not progress)

#### Think & plan

- [x] bad first draft of document "use client"
- [x] bad first draft of document "use server"
- [x] bad first draft of document RSC
- [x] bad first draft of a plan

#### Build stuff

- [x] create a example "use client" file
- [x] create a example "use server" async function
- [x] create a example "use server" file
- [x] toy tests can be run with `bun test`
- [x] create a toy example project
- [x] add ReactDOM.renderToReadableStream
- see [example0 tests](examples/example0.test.ts) for further concrete stuff being built

#### Build more stuff

- [x] create an example React async server component
- [x] add the example React async server component to the toy example project
- [x] create an example React client component: Timer
- [x] add Timer to the toy example project with SSG

#### Import stuff

- [x] add importmap
- [x] pin client dependencies to package.json versions
- [x] figure out how to install the react-server builds of react and react-dom on the client
  - we don't want to use the server builds on the client
- [x] figure out how to install the react-server builds of react and react-dom on the server
  - [x] verify that all react imports are importing the react-server build
- [x] bun now supports --conditions flags, simplifying react-erver imports
- [ ] figure out: do I actually need the react-server build of react and react-dom?
- [x] import react-server-dom-webpack

#### type stuff

- [x] support async component `'() => Promise<Element>' is not a valid JSX element type` error

#### learn stuff

- [ ] Following along with these docs: https://www.tldraw.com/v/ewUjqL4R984F5b-qghZUC?v=-131,-3551,2315,1212&p=page

#### Directives

- [x] Bun import plugin for ".client.js" files (mostly working, needs more tests)
- [ ] Bun import plugin for "use client" imports
- [ ] loading "use client" code on the server does
- [ ] support loading "use client" code on the server
- [ ] support loading "use server" code on the client
- [ ] add Suspense boundary to the server component

#### Build even more stuff

- figure out what to do next
- add more tasks

</details>

---

<details>

<summary>context</summary>

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

</details>

---

## The "MIT No Attribution" (MIT-0) License

This project is licensed under the MIT No Attribution License. See the [LICENSE](LICENSE) file for details.
