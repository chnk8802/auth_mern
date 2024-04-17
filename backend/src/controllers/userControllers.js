import User from "../models/userModel.js"

const register = async (req, res) => {
    try {
        const { username, fullname, email, password, bio } = req.body
        
        if (!username || !email || !password) {
            res.status(400).json({code:1,error: 'Missing mandatory fields'});
            return;
        }
       
        const userExist = await User.findOne({$or: [{username}, {email}]})
        
        if (userExist) {
            if (userExist.username === username && userExist.email === email) {
                res.status(400).json({code:2,error: 'username & email already exist'});
            return;
            } 
            if ( userExist.username === username ) {
                res.status(400).json({code:3,error:"username already exist"})
                return
            } 
            if (userExist.email === email) {
                res.status(400).json({code:4,error:"email already exist"})
                return
            }
        }
        
        const user = new User({
            username,
            fullname,
            email,
            password,
            bio
        })
        
        await user.save();
        res.status(201).json(user)
    } catch (e) {
        res.status(500).send(e.toString())
    }
}



const login = (req, res) => {
    console.log("just a test")
    res.send("just a test")
}
const test = (req, res) => {
    res.send(`User Model: ${User}`)
}

export default { register, login, test }