'use server'

import connectDB from "@/lib/db";
import CredentialsModel from "@/models/CredentialsModel";


export async function getCredentials() {
  try {
    await connectDB();
    const data = await CredentialsModel.find({});

    // throw new Error('Error!')

    return { data }
  } catch (error) {
    return { errMsg: error.message }
  }
}