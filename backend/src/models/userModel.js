import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema);

export default User