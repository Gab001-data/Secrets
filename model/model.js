require('dotenv').config();
const mongoose= require("mongoose");
const encrypt= require("mongoose-encryption");

const userSchema= new mongoose.Schema({
    username: String,
    password: String
});
const secret= process.env.SECRET;
userSchema.plugin(encrypt, {secret:secret, encryptedFields: ['password']});

module.exports= new mongoose.model('User', userSchema);