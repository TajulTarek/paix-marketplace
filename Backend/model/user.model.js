import mongoose from "mongoose";
import dotenv from "dotenv";

const userSchema = new mongoose.Schema({   
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cardNo: Number,
    securityKey: Number,
    orderIDs: Array, // array of orderIDs
    cart:  Array, // array of productIDs

})
const User = mongoose.model('User', userSchema)
export default User