import User from "../model/user.model.js"
import jwt from "jsonwebtoken";


export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Unauthorized - no token provided"
            })
        }

        //Bearer eyc
        const token = authHeader.split(" ")[1];
        const decoded =jwt.verify(token, process.env.JWT_SECRET_KEY) 
console.log(decoded)
        const user = await User.findById(decoded.userID).select("-password")
console.log(user)
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const isAdmin = async (req, res, next) => {
    if(req.user?.role !== 'admin'){
        return res.status(401).json({
            message: "Access denied"
        })
    }
    next();
}