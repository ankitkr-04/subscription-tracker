import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { name, email, password } = req.body;

        // Normalize email and check for existing user
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({email: normalizedEmail}, null, null).session(session);
        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });

        // Save user to the database
        await newUser.save({ session });

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // Commit transaction and end session
        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                token,
                user: newUser,
            }
        });
    } catch (error) {
        // Abort transaction and end session on error
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Normalize email and find user
        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail },null,null);
        if (!user) {
            const error = new Error('User Not Found');
            error.statusCode = 404;
            throw error;
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            const error = new Error('Invalid Credentials');
            error.statusCode = 401;
            throw error;
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: {
                token,
                user
            }
        });
    } catch (error) {
        next(error);
    }
};

export const signOut = async (req, res, next) => {
//    SignOut logic here
}