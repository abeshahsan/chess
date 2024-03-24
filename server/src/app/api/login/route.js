// import { getCredentials } from "../../../../data/data";

import { setCurrentUser } from "@/_lib/user";
import { findUser } from "../../../../data/data";

// export async function GET() {

//     const { data, errMsg } = await getCredentials();

//     if (errMsg)
//         console.log(errMsg);

//     console.log(data);

//     return Response.json(data);
// }


export async function POST(req) {
    try {
        let body = await req.json();
        let user = await findUser(body.email);
        setCurrentUser(user.data[0]);
        return Response.json(user.data[0]);
    } catch (error) {
        return Response.status(400).json({ error: error.message });
    }
}
