const { mongoose } = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [
            {
                validator: function (v) {
                    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
            {
                validator: async function (email) {
                    const emailCount = await mongoose.models.credentials.countDocuments({ email });
                    return !emailCount;
                },
                message: props => `${props.value} already exists!`
            }
        ]
    },
    password: {
        type: String,
        required: true
    },
}, { strict: true });


const schema = mongoose.models.credentials || mongoose.model('credentials', userSchema);

module.exports = schema