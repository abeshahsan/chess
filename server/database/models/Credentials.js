const {mongoose} = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {strict: true});

const CredentialsModel = mongoose.models.credentials || mongoose.model('credentials', userSchema);

module.exports = CredentialsModel