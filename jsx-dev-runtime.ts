/**
 * react/jsx-dev-runtime 19.0.0-beta-94eed63c49-20240425
 * does not support react-server yet
 * and bun seems to ignore the tsconfig.json compilerOptions.jsx setting
 * so this it a workaround to use jsx-runtime instead of jsx-dev-runtime.
 */

// @ts-ignore
export * from "react/jsx-runtime"
