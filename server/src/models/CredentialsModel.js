

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
});

const CredentialsModel = mongoose.models.credentials || mongoose.model('credentials', userSchema);

export default CredentialsModel;
