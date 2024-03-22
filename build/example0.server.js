// @bun
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// examples/example0.server.ts
var {$ } = globalThis.Bun;
async function doStuffOnTheServer() {
  console.debug("executing", import.meta.url, "doStuffOnTheServer");
  console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.");
  return await $`ls -l $TMPDIR`.text();
}
"use server";
console.debug("executing", import.meta.url);
console.assert(typeof window === "undefined", "This is server-side code, so `window` should not be defined.");
export {
  doStuffOnTheServer
};

//# debugId=95980F295022DB3A64756e2164756e21
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vZXhhbXBsZXMvZXhhbXBsZTAuc2VydmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWwogICAgIlwidXNlIHNlcnZlclwiXG5cbmltcG9ydCB7ICQgfSBmcm9tIFwiYnVuXCJcblxuY29uc29sZS5kZWJ1ZyhcImV4ZWN1dGluZ1wiLCBpbXBvcnQubWV0YS51cmwpXG5jb25zb2xlLmFzc2VydCh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiLCBcIlRoaXMgaXMgc2VydmVyLXNpZGUgY29kZSwgc28gYHdpbmRvd2Agc2hvdWxkIG5vdCBiZSBkZWZpbmVkLlwiKVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG9TdHVmZk9uVGhlU2VydmVyKCkge1xuICAvLyBcInVzZSBzZXJ2ZXJcIiBkaXJlY3RpdmUgaXMgbm90IG5lY2Vzc2FyeSBoZXJlLCBiZWNhdXNlIGl0J3MgYWxyZWFkeSBhdCB0aGUgdG9wIG9mIHRoZSBmaWxlXG4gIGNvbnNvbGUuZGVidWcoXCJleGVjdXRpbmdcIiwgaW1wb3J0Lm1ldGEudXJsLCBcImRvU3R1ZmZPblRoZVNlcnZlclwiKVxuICBjb25zb2xlLmFzc2VydCh0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiLCBcIlRoaXMgaXMgc2VydmVyLXNpZGUgY29kZSwgc28gYHdpbmRvd2Agc2hvdWxkIG5vdCBiZSBkZWZpbmVkLlwiKVxuXG4gIHJldHVybiBhd2FpdCAkYGxzIC1sICRUTVBESVJgLnRleHQoKVxufVxuIgogIF0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEvLy8vL2ZBRUE7QUFLQSxlQUFzQixrQkFBa0IsR0FBRztBQUV6QyxVQUFRLE1BQU0sYUFBYSxZQUFZLEtBQUssb0JBQW9CO0FBQ2hFLFVBQVEsY0FBYyxXQUFXLGFBQWEsOERBQThEO0FBRTVHLFNBQU8sTUFBTSxpQkFBaUIsS0FBSztBQUFBO0FBWnJDO0FBSUEsUUFBUSxNQUFNLGFBQWEsWUFBWSxHQUFHO0FBQzFDLFFBQVEsY0FBYyxXQUFXLGFBQWEsOERBQThEOyIsCiAgImRlYnVnSWQiOiAiOTU5ODBGMjk1MDIyREIzQTY0NzU2ZTIxNjQ3NTZlMjEiLAogICJuYW1lcyI6IFtdCn0=
