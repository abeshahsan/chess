import { currentUser } from "@/_lib/user";

export async function GET() {
    try {
        return Response.json({
            status: `${currentUser ? 'OK' : ''}`,
            user: currentUser
        });
    } catch (error) {
        return Response.status(400).json({ error: error.message });
    }
}