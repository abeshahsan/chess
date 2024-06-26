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

async function insertUser(user) {
    try {
        const data = await CredentialsModel.collection.insertOne({
            email: user.email,
            name: user.name,
            picture: user.picture,
        });
        console.log(data);
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
};
