import mongoose from "mongoose";
import {DB_URI, NODE_ENV} from "../config/env.js";

if(!DB_URI) {
    throw new Error('Please provide a valid MongoDB URI inside .env.<dev/prod>.local file');
}

const connectToDatabse = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`MongoDB connected in ${NODE_ENV} mode`);
    } catch (error) {
        console.error(`Error connecting to db: ${error.message}`);
        process.exit(1);
    }
}
export default connectToDatabse;