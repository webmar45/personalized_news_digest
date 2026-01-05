import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendEmail(to, subject, html) {
  await transporter.sendEmail({
    from: `"News Digest" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });
}
