const argon2 = require('argon2');

const connectDB = require('./connection')
const CredentialsModel = require('./models/Credentials');


(async () => {
    await connectDB();
})();

async function getCredentials() {
    try {
        const data = await CredentialsModel.find();

        return { data }
    } catch (error) {
        return { errMsg: error.message }
    }
}

async function findUser(email) {
    try {
        const data = await CredentialsModel.find({ email });

        return { data }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function checkIfEmailExists(email) {
    try {
        const data = await CredentialsModel.findOne({ email });

        return { exists: !!data }
    }
    catch (error) {
        throw new Error(error.message);
    }
}

async function insertUser(user) {
    try {
        const cred = new CredentialsModel({...user});

        const errors = await cred.validate();

        if (errors) {
            const errorMessages = Object.keys(errors.errors).map(key => errors.errors[key].message);
            throw new Error(errorMessages);
        }

        cred.password = await argon2.hash(cred.password);

        const data = await cred.save();

        return { data: data[0] }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllUsers() {
    try {
        const data = await CredentialsModel.find();

        return { data }
    } catch (error) {
        console.log(`${error.message}`);
        throw new Error(error.message);
    }
}

module.exports = {
    getCredentials,
    findUser,
    insertUser,
    getAllUsers,
    checkIfEmailExists,
};
