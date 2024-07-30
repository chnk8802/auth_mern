import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 330
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
    },
    otp: {
        type: String
    },
    otpExpires: {
        type: Date
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordTokenExpires: {
        type: Date
    },
},
{
    timestamps: true,
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