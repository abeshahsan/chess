'use server'

import connectDB from "@/_lib/db";
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

        return { data }
    } catch (error) {
        return { errMsg: error.message }
    }
}

export async function insertUser(user) {
    try {
        const data = await CredentialsModel.collection.insertOne({
            email: user.email,
            name: user.name,
            picture: user.picture,
        })
        console.log(data);
        return { data: data[0] }
    } catch (error) {
        return { errMsg: error.message }
    }
}