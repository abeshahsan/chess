import { setCurrentUser } from "@/_lib/user";
import { findUser, insertUser } from "../../../../data/data";

export async function POST(req) {
    try {
        let user;
        let body = await req.json();
        let result = await findUser(body.email);

        if(result.data.length == 0) { // This is a new user
            user = await insertUser(body);
        }
        setCurrentUser(body);
        return Response.json("ok");
    } catch (error) {
        return Response.json({ error: error.message });
    }
}
