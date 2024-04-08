/// <reference types="bun" />

import { clientBundle_pluginConfig } from "./clientBundle.plugin"
import { useClient_fromServer_pluginConfig } from "./useClient_fromServer.plugin"

export const bun_plugins_for_react_server = [useClient_fromServer_pluginConfig, clientBundle_pluginConfig]

export function plugin() {}
