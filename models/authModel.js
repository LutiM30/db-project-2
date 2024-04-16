const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const AuthSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    userType: { 
        type: String, 
        required: true 
    }
});

AuthSchema.plugin(uniqueValidator);

const Auth = mongoose.model("auth", AuthSchema);
module.exports = Auth;
