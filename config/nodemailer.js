import nodemailer from "nodemailer";
import {EMAIL_PASSWORD} from "./env.js";

export const ACCOUNT_EMAIL = 'work.ankittechie@gmail.com';
 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: ACCOUNT_EMAIL,
        password: EMAIL_PASSWORD
    }
})
export default transporter;