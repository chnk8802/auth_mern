import nodemailer from "nodemailer";
import oAuth2Client from "./googleOAuthClient.js";

/**
 * Sends a reset password email containing an OTP to the specified user email.
 *
 * Uses Google's OAuth2 for secure SMTP authentication.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The one-time password/token for password reset.
 * @returns {Promise<{success: string} | {error: string}>} - Promise resolving to success or error info.
 */
async function sendResetPasswordEmail(email, otp) {
  try {
    // Retrieve the refresh token from environment variables
    const REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

    // Set OAuth2 client's refresh token
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    // Obtain a fresh access token using the refresh token
    const accessToken = await oAuth2Client.getAccessToken();

    // If access token retrieval fails, throw an error
    if (!accessToken.token) {
      throw new Error(
        "Failed to obtain access token. Please check your credentials."
      );
    }

    // Create a Nodemailer transporter using Gmail and OAuth2 authentication
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USER || "smtpsmtp13@gmail.com", // Email address you're sending from
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    // HTML content of the email including the OTP token
    const htmlContent = `
  <div style="font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb; padding: 40px; border-radius: 10px; max-width: 600px; margin: 40px auto; box-shadow: 0 8px 20px rgba(0,0,0,0.1);">
    <div style="text-align: center;">
      <h1 style="color: #1e293b; font-size: 28px; margin-bottom: 10px;">Reset Your Password</h1>
      <p style="font-size: 16px; color: #475569;">Use the OTP below to reset your password. This code is valid for the next <strong>10 minutes</strong>.</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <span style="display: inline-block; padding: 16px 40px; font-size: 24px; background-color: #0ea5e9; color: white; font-weight: bold; letter-spacing: 2px; border-radius: 8px;">
        ${otp}
      </span>
    </div>

    <p style="color: #64748b; font-size: 14px; text-align: center;">
      If you didn't request this, please ignore this email or contact support.
    </p>

    <p style="margin-top: 30px; text-align: center; font-size: 12px; color: #94a3b8;">
      &copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.
    </p>
  </div>
`;

    // Email message options
    const mailOptions = {
      from: "smtpsmtp13@gmail.com", // Sender address
      to: email, // Recipient address
      subject: "Reset password", // Email subject line
      html: htmlContent, // Email body in HTML format
    };

    // Send the email asynchronously and wait for response
    const info = await transporter.sendMail(mailOptions);

    // Log and return success message id
    // console.log("Email sent: " + info.messageId);
    return { success: info.messageId };
  } catch (error) {
    // Log any error during the process and return a user-friendly error message
    // console.error("Error sending email:", error);
    return { error: "Failed to send reset password email. Please try again later." };
  }
}

export default sendResetPasswordEmail;
