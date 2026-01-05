import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendMail(to, subject, html) {
  await transporter.sendMail({
    from: `"News Digest" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
}
