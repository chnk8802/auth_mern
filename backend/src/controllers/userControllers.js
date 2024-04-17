import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js";
// import logger from "../logs/logger.js";

const register = async (req, res) => {
    try {
        const { username, fullname, email, password, bio } = req.body
        
        if (!username || !email || !password) {
            res.status(400).json({code:1,error: 'Missing mandatory fields'});
            return;
        }
       
        const existingUser = await User.findOne({$or: [{username}, {email}]})
        
        if (existingUser) {
            let errorMessage
            if (existingUser.username === username && existingUser.email === email) {
                errorMessage = "Username & email already exist"
            } 
            if ( existingUser.username === username ) {
                errorMessage = "Username already exists"
            } 
            if (existingUser.email === email) {
                errorMessage = "Email already exists"
            }
            return res.status(400).json({error:errorMessage})
        }
        
        const newUser = new User({
            username,
            fullname,
            email,
            password,
            bio,
        })
        
        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            fullname: newUser.fullname,
            email: newUser.email,
            bio: newUser.bio,
            token: generateToken(newUser._id)
        })
    } catch (error) {
        // logger.error("hello")
        res.status(500).send(error.toString())
    }
}



const login = async (req, res) => {
    
    try {
        const { email, password } = req.body
        const user = await User.findOne({email})
        if(user && user.matchPassword(password)) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                email: user.email,
                bio: user.bio,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}
const test = (req, res) => {
    res.send(`User Model: ${User}`)
}

export default { register, login, test }