/** @format */
"use client";

import { PluginProvider, usePluginContext } from "@/src/layout/components/PluginContext";
// pages/index.js
import React, { useEffect } from "react";

const HomePage = () => {
    const { registerPlugin } = usePluginContext();

    useEffect(() => {
        registerPlugin("CardPlugin");
    }, []);

    return (
        <div>
            <h1>Welcome to the Homepage</h1>
            {/* Render the registered plugins */}
            <PluginRenderer />
        </div>
    );
};

const PluginRenderer = () => {
    const { plugins } = usePluginContext();

    return (
        <>
            {plugins.map((Plugin, index) => (
                <Plugin key={index} />
            ))}
        </>
    );
};

const App = () => {
    return (
        <PluginProvider>
            <HomePage />
        </PluginProvider>
    );
};

export default App;
