const {mongoose} = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
});

const CredentialsModel = mongoose.models.credentials || mongoose.model('credentials', userSchema);

module.exports = CredentialsModel