
import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {

        mongoose.connect("mongodb+srv://admin:123@luiggy123.byhrh.mongodb.net/base001")
        console.log("Mongo DB Connected")
        
    } catch (error) {
        console.log(`Error: ${error}`)
        
    }
}

