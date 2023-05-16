const { mkdir, writeFile, readdir } = require("fs");
import { NextResponse } from "next/server";
import * as fs from "fs";

const folderPath = "src/layout/components";

export async function GET(request) {
    // request.headers.get("admin-key")
    const fileContent = [];
    // console.log(content);
    var files = fs.readdirSync(folderPath);

    files.forEach((file) => {
        const content = fs.readFileSync(`${folderPath}/${file}`, "utf8");
        console.log(content.includes("Yeasir Arafat"));
        // fileContent.push({ content });
    });
    console.log("fileContent", fileContent);
    return NextResponse.json({ data: files }, { status: 200 });
}

// readFileSync -> If we use it, it will through err if this folder contain any folder. Only file is allowed.

// writeFile(fileName, fileContent, (err) => {
//     if (err) throw err;
//     console.log("File created!");
// });
// readdir(folderName, "utf8", (err, files) => {
//     if (err) throw err;
//     console.log(files);
// });

// readdir(folderPath, "utf8", (err, files) => {
//     if (err) throw err;
//     console.log(files);
//     files.forEach((file) => {
//         // fileContent.push(...file);
//         console.log("fileaaaaaaaaa", file);
//     });
// });
