/** @format */
// AUTHOR: MARUF
// LAST MODIFIED: 26 July, 2023
// VERSION: v1.0.0

// components/PluginContext.js
import { createContext, useContext, useState } from "react";

const PluginContext = createContext();

export function usePluginContext() {
    return useContext(PluginContext);
}

export function PluginProvider({ children }) {
    const [plugins, setPlugins] = useState([]);

    // Function to dynamically load and register a new plugin
    const registerPlugin = async (pluginName) => {
        try {
            const plugin = await import(`../plugins/${pluginName}`);
            setPlugins((prevPlugins) => [...prevPlugins, plugin.default]);
        } catch (error) {
            console.error(`Error loading plugin '${pluginName}':`, error);
        }
    };

    return (
        <PluginContext.Provider value={{ plugins, registerPlugin }}>
            {children}
        </PluginContext.Provider>
    );
}
