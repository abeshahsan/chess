import { hash } from "argon2";

import connectDB from "./connection.js";
import CredentialsModel from "./models/CredentialsModel.js";

/**
 * Connects to the database.
 * @returns {Promise<void>} - A promise that resolves when the connection is established.
 */
(async () => {
    await connectDB();
})();

/**
 * Retrieves all credentials from the database.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved credentials data.
 * @throws {Error} - If there is an error during the retrieval process.
 */
async function getCredentials() {
    try {
        const data = await CredentialsModel.find();

        return { data };
    } catch (error) {
        return { errMsg: error.message };
    }
}

/**
 * Finds a user by email in the database.
 * @param {string} email - The email of the user to find.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved user data.
 * @throws {Error} - If there is an error during the retrieval process.
 */
async function findUserByEmail(email) {
    try {
        const data = await CredentialsModel.find({ email });

        return { data };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Checks if an email exists in the database.
 * @param {string} email - The email to check.
 * @returns {Promise<Object>} - A promise that resolves to an object indicating if the email exists.
 * @throws {Error} - If there is an error during the check process.
 */
async function checkIfEmailExists(email) {
    try {
        const data = await CredentialsModel.findOne({ email });

        return { exists: !!data };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Inserts a user into the database.
 * @param {Object} user - The user object to be inserted.
 * @returns {Promise<Object>} - A promise that resolves to the inserted user data.
 * @throws {Error} - If there is an error during the insertion process.
 */
async function insertUser(user) {
    try {
        const cred = new CredentialsModel({ ...user });

        const errors = await cred.validate();

        if (errors) {
            const errorMessages = Object.keys(errors.errors).map((key) => `${errors.errors[key].message}eafeafea`);
            throw new Error(errorMessages);
        }

        cred.password = await hash(cred.password);

        const data = await cred.save();

        return { data: data[0] };
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * Retrieves all users from the database.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved users data.
 * @throws {Error} - If there is an error during the retrieval process.
 */
async function getAllUsers() {
    try {
        const data = await CredentialsModel.find();

        return { data };
    } catch (error) {
        console.log(`${error.message}`);
        throw new Error(error.message);
    }
}

export { getCredentials, findUserByEmail, insertUser, getAllUsers, checkIfEmailExists };
