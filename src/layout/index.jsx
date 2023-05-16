import axios from "axios";
import Image from "next/image";
import { useEffect } from "react";
const path = require("path");

const Layout = ({ children }) => {
    useEffect(() => {
        const getData = async () => {
            const res = await axios("/api/creator", {
                headers: {
                    "Content-Type": "application/json",
                    "admin-key": "321#@",
                },
            });
            console.log(res);
        };
        getData();
        console.log(path.dirname(new URL(import.meta.url).pathname).split("next-13-explore"));
    }, []);
    return <div>{children}</div>;
};
export default Layout;
