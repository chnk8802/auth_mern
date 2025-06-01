import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

// List of required environment variables for the OAuth client to work correctly
const REQUIRED_ENV_VARS = [
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "GOOGLE_REFRESH_TOKEN",
  "GOOGLE_REDIRECT_URI",
  "GOOGLE_SMTP_USER",
];

// Validate that all required env vars are set, otherwise throw an error
REQUIRED_ENV_VARS.forEach((key) => {
  if (!process.env[key]) throw new Error(`Missing env var: ${key}`);
});

// Initialize the OAuth2 client with your Google app credentials and redirect URI
const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

/**
 * Generates the Google OAuth2 authorization URL
 * Visit this URL in a browser to get user consent and an authorization code
 * @returns {string} URL to authorize the app and get an authorization code
 */
const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    // 'offline' grants a refresh token to maintain long-term access
    access_type: "offline",
    // Scope allowing sending email on behalf of the user
    scope: ["https://mail.google.com/"],
  });
  return authUrl;
};

// console.log("Google OAuth URL: ", getAuthUrl());
/* 
Example usage:
console.log("Google OAuth URL: ", getAuthUrl());
Visit the logged URL to get your authorization code.
*/

// Hardcoded authorization code obtained after visiting the auth URL
// Replace this with your actual authorization code before running getTokens()
const AUTHORIZATION_CODE ="4/0AUJR-x6VwuQC96cLqNuoqwJhNJP5OcjQSv53bzaqHiamOkDZbMFQ__M6S-Jf-FLrtTv9_w";

/**
 * Exchanges the authorization code for access and refresh tokens.
 * This is a one-time step needed to get your refresh token.
 * After running this, save the tokens securely (especially the refresh token).
 */
async function getTokens() {
  try {
    const { tokens } = await oAuth2Client.getToken(AUTHORIZATION_CODE);
    console.log({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });

    // Set the credentials on the client for subsequent API calls if needed
    oAuth2Client.setCredentials(tokens);
  } catch (error) {
    console.error("Error exchanging authorization code for token: ", error);
  }
}

// Uncomment and run once to obtain tokens:
// getTokens();

// Export the configured OAuth2 client for use in other modules (e.g., nodemailer)
export default oAuth2Client;
