// emailService.js
import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;
client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

export async function sendEmail(to, content) {
  if (!process.env.EMAIL_USER) {
    throw new Error("EMAIL_USER is missing in environment variables");
  }

  try {
    const emailData = {
      to: [{ email: to }],
      sender: {
        email: process.env.EMAIL_USER,
        name: "Personalized_News_Digest"
      },
      subject: "Your Personalized News Digest",
      htmlContent: content
    };

    const response = await emailApi.sendTransacEmail(emailData);
    console.log("Email sent successfully:", response);
    return response;

  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.body || error
    );
    throw error;
  }
}
