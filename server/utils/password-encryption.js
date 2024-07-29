const argon2 = require('argon2');

async function hashPassword(password) {
    try {
        const hashedPassword = await argon2.hash(password);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function verifyPassword(password, hashedPassword) {
    try {
        const isPasswordValid = await argon2.verify(hashedPassword, password);
        return isPasswordValid;
    } catch (error) {
        console.error('Error verifying password:', error);
        throw error;
    }
}

module.exports = {
    hashPassword,
    verifyPassword,
};
