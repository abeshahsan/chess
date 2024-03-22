import { getCredentials } from "../../../../data/data";

export async function GET() {

    const { data, errMsg } = await getCredentials();

    if (errMsg)
        console.log(errMsg);

        console.log(data);

    return Response.json(data);
}


export async function POST() {
    console.log("ghum");
    return Response.json([
        {
            "s": 200,
        },
    ]);
}
