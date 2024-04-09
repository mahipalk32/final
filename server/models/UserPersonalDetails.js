const mongoose = require("mongoose");

const UserPersonalDetails = new mongoose.Schema({
    name: String,
    dob: String,
    gender: String,
    age: Number,
    aadhar: Number,
    mobileNo: Number,
    email: String,
    fatherName: String,
})

const UserPersonalDetailsModel = mongoose.model("user-personal-details", UserPersonalDetails);
module.exports = UserPersonalDetailsModel;
