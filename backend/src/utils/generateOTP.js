import jwt from 'jsonwebtoken'

const generateOTP = (userId) => {
    return Math.floor(Math.random() * Math.pow(10, 6))
}

export default generateOTP