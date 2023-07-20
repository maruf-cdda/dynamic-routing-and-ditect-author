/** @format */

import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
const path = require("path");

const Layout = ({ children }) => {
    useEffect(() => {
        const getData = async () => {
            // const folderPath = path
            //     .dirname(new URL(import.meta.url).pathname)
            //     .split("next-13-explore")[1]
            //     .slice(1);
            const res = await axios(
                "/api/creator",
                // { path: folderPath, repo: "components" },
                { headers: { "Content-Type": "application/json" } }
            );
            console.log(res);
        };
        getData();
    }, []);
    return <div>{children}</div>;
};
export default Layout;
