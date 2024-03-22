

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
});

const CredentialsModel = mongoose.models.CredentialsModel || mongoose.model('credentials', userSchema);

export default CredentialsModel;
