/** @format */

"use client";
import Layout from "@/src/layout";
import { usePluginContext } from "@/src/layout/components/PluginContext";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [allPlaugins, setAllPlugins] = useState([]);
  const { registerPlugin, plugins } = usePluginContext();

  // REGISTER ALL COMPONENTS
  useEffect(() => {
    allPlaugins?.forEach((component) => {
      registerPlugin(component);
    });
  }, [allPlaugins]);

  // GET ALL FILE NAMES FROM A PLUGIN FOLDER
  useEffect(() => {
    const getData = async () => {
      const res = await axios("/api/getComponentFile", {
        headers: { "Content-Type": "application/json" },
      });
      setAllPlugins(res.data.fileContent);
    };
    getData();
  }, []);

  console.log("plugins", plugins);

  return (
    <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center">Home</h1>
      <PluginRenderer plugins={plugins} />
    </Layout>
  );
}

// RENDER ALL PLUGIN COMPONENTS PLUGIN
const PluginRenderer = ({ plugins }) => {
  return (
    <>
      {plugins?.map((Plugin, index) => (
        <Plugin key={index} />
      ))}
    </>
  );
};
