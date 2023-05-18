const { readdir } = require("fs");
import { NextResponse } from "next/server";
const path = require("path");
import * as fs from "fs";
import { cwd } from "node:process";

const folderPath = "src/layout/components";

export async function GET(request) {
    const items = fs.readdirSync(folderPath);
    const directoryContents = [];

    items.forEach((item) => {
        const itemPath = `${folderPath}/${item}`;
        const itemStats = fs.statSync(itemPath);

        if (itemStats.isFile()) {
            const content = fs.readFileSync(itemPath, "utf8");
            directoryContents.push({ type: "file", name: item, content });
        } else if (itemStats.isDirectory()) {
            directoryContents.push({ type: "folder", name: item });
        }
    });

    return NextResponse.json({ data: directoryContents }, { status: 200 });
}

export async function POST(request) {
    const { path, repo } = await request.json();
    const fileContent = [];
    // GET ALL FILES FROM A FOLDER
    var files = fs.readdirSync(`${path}/${repo}`);
    // GET AUTHOR, LAST MODIFIED, VERSION FROM EACH FILE

    const current_dir = cwd();
    console.log("Current directory", current_dir.split("\\").slice(-1)[0]);

    files.forEach((file) => {
        const content = fs.readFileSync(`${path}/${repo}/${file}`, "utf8");
        fileContent.push(parseCommentBlock(content));
    });
    return NextResponse.json({ data: fileContent }, { status: 200 });
}

// A FUNC TO DETECT AUTHOR, LAST MODIFIED, VERSION
function parseCommentBlock(commentBlock) {
    const regex = /\/\/\s*(AUTHOR|LAST MODIFIED|VERSION):\s*([\w\s.,]+)/g;
    const result = {};
    let match;

    while ((match = regex.exec(commentBlock))) {
        const key = match[1].replace(" ", "_");
        const value = match[2].replace(/\s+/g, " ").trim();
        if (key && value) {
            result[key] = value;
        }
    }

    return result;
}

// A FUNC TO CHECK FOLDERS OR FILES FROM A DIRECTORY
function checkExtensions(filenames) {
    const results = {};

    filenames.forEach((filename) => {
        const extension = path.extname(filename);
        if (extension) {
            results[filename] = true; // Has extension
        } else {
            results[filename] = false; // No extension
        }
    });

    return results;
}

// export async function GET(request) {
//     // request.headers.get("admin-key")
//     // const { searchParams } = new URL(request.url);
//     // console.log(searchParams.get("id"));

//     const fileContent = [];
//     var files = fs.readdirSync(folderPath);

//     files.forEach((file) => {
//         const content = fs.readFileSync(`${folderPath}/${file}`, "utf8");
//         console.log(content.includes("Yeasir Arafat"));
//         // fileContent.push({ content });
//     });
//     console.log("fileContent", fileContent);
//     return NextResponse.json({ data: files }, { status: 200 });
// }

// *************************************************************************************

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
// readdir(path, "utf8", async (err, files) => {
//     // if (err) throw err;
//     console.log(checkExtensions(files));
// });
