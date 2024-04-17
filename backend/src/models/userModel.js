import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 16
    },
    fullname: {
        type: String,
    },
    bio: {
        type: String,
    },
    age: {
        type: Number
    },
    image: {
        type: String
    }
}, 
{
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

export default User