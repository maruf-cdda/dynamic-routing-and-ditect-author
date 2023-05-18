"use client";
import Layout from "@/src/layout";

export default function Home() {
    // const res = reFormatArray(members);

    return (
        <Layout className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold text-center">Home</h1>
        </Layout>
    );
}

// const reFormatArray = (arr) => {
//     const result = arr.map((member) => {
//         member["available"] = !member["available"];
//         member["projects"] = member["projects"].filter((project) => project === "cdda");
//         return member;
//     }, []);

//     return result;
// };
