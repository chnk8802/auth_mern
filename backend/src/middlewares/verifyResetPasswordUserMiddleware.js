import jwt from 'jsonwebtoken'

const verifyResetPasswordUser = async (req, res, next) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
}

export default verifyResetPasswordUser