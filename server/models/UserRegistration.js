const mongoose = require('mongoose');

const UserRegistrationSchema = new mongoose.Schema({
    name:String,
    email:String,
    wallet:Number
})

const UserRegistrationModel = mongoose.model("registration", UserRegistrationSchema);
module.exports = UserRegistrationModel;