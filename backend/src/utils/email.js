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
      <h1>Hello from Node.js</h1>
      <p>This is your token <b>${otp}</b></p>
    `;

    // Email message options
    const mailOptions = {
      from: "smtpsmtp13@gmail.com", // Sender address
      to: email,                    // Recipient address
      subject: "Reset password",    // Email subject line
      html: htmlContent,            // Email body in HTML format
    };

    // Send the email asynchronously and wait for response
    const info = await transporter.sendMail(mailOptions);

    // Log and return success message id
    console.log("Email sent: " + info.messageId);
    return { success: info.messageId };

  } catch (error) {
    // Log any error during the process and return a user-friendly error message
    console.error("Error sending email:", error);
    return { error: "Failed to send email. Please try again later." };
  }
}

export default sendResetPasswordEmail;
