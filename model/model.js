require('dotenv').config();
const mongoose= require("mongoose");
const encrypt= require("mongoose-encryption");

const userSchema= new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(encrypt, {secret:process.env.SECRET, encryptedFields: ['password']});

module.exports= new mongoose.model('User', userSchema);