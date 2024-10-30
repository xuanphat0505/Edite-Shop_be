import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "Gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_NAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});
export const mailService = async ({ email, subject, html }) => {
  const message = {
    from: process.env.EMAIL_NAME, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: html, // html body
  };
  const result = await transporter.sendMail(message);
  return result;
};
