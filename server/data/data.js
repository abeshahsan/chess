'use server'

import connectDB from "@/lib/db";
import CredentialsModel from "@/models/CredentialsModel";

(async () => {
    await connectDB();
})();

export async function getCredentials() {
    try {
        const data = await CredentialsModel.find();

        return { data }
    } catch (error) {
        return { errMsg: error.message }
    }
}

export async function findUser(email) {
    try {
        const data = await CredentialsModel.find({ email });

        return { data: data[0] }
    } catch (error) {
        return { errMsg: error.message }
    }
}