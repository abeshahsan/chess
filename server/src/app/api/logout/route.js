import { currentUser } from "@/_lib/user";
import { findUser, insertUser } from "../../../../data/data";

export async function POST(req) {
    try {
        currentUser = null;
        return Response.json("logged out");
    } catch (error) {
        return Response.json({ error: error.message });
    }
}

