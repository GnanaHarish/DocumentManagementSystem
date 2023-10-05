import User from "../models/user.js"
import connectToDatabase from "../config/db.js";


connectToDatabase();


export async function authenticateUser(req, res, next){
    const token = req.headers.authorization?.replace('Bearer ', '');

    if(!token){
        return res.status(401).json({message: "You are not authorized"});
    }

    try {
        
        const user = await User.findOne({id: token});
        if(!user){
            return res.status(401).json({message: "You are not authorized"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error", error)
        return res.status(500).json({message: "Internal Server Error"});
    }
}