import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

// Use named exports clearly
export async function sendEmail(to, html) {
  const mailOptions = {
    from: `"News Digest" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: "Your Personalized News Digest", 
    html: html
  };

  
  return await transporter.sendMail(mailOptions);
}