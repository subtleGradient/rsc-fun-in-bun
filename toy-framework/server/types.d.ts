import { type Server } from "bun"

export type Pathname = `/${string}`
export type ModuleID = string
export type RouteMap = Record<Pathname, Server["fetch"]>
export type ImportMap = Record<ModuleID, Pathname>
