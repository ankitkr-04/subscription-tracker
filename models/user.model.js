import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 3,
        maxLength: 40
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        trim: true,
        unique: true,
       lowercase: true,
        match: [/^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid Email']
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;