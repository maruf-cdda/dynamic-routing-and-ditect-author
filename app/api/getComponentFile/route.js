/** @format */
import { NextResponse } from "next/server";
const { readdir } = require("fs");
const util = require("util");

const readdirAsync = util.promisify(readdir);

export async function GET(request) {
    try {
        const fileContent = [];
        const path = "src/layout/plugins";
        const files = await readdirAsync(path, "utf8");

        files.forEach((file) => {
            const convertedFile = file.split(".")[0];
            fileContent.push(convertedFile);
        });
        return NextResponse.json({ fileContent }, { status: 200 });
    } catch (error) {
        console.error("Error reading directory:", error);
        return NextResponse.json({ error: "Error reading directory" }, { status: 500 });
    }
}
