import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const MongoURI = process.env.MONGODB_URL;


export default async function connectToDatabase(){
    try {
        await mongoose.connect(MongoURI);
    } catch (error) {
        console.log(error)
    }
}