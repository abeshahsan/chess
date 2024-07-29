const { mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, { strict: true });

userSchema.path('email').validate(async (email) => {
    const emailCount = await mongoose.models.credentials.countDocuments({ email });
    return !emailCount;
}, 'Email {VALUE} already exists');

const schema = mongoose.models.credentials || mongoose.model('credentials', userSchema);

module.exports = schema