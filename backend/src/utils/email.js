import nodemailer from 'nodemailer'

const sendResetPasswordEmail = (email, otp) => {
    /* Send an email to user
        1. Which must contain a link which redirect the user to a page which have fields to enter new password.
        2. When user is successfully redirected to that page user should be verified using the token
        3. When user enter the new password and click reset password a request to server is made to set new password
    */
   const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "smtpsmtp13@gmail.com",
      pass: "fcguoslltajccvny",
    },
  })

  // HTML content
const htmlContent = `
<h1>Hello from Node.js</h1>
<p>This is a your token <b>${otp}</b></p>
`;

  const mailOptions = {
    from: "smtpsmtp13@gmail.com",
    to: email,
    subject: "Reset password",
    html: htmlContent
  }

  // Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error.message);
      return {error: error.message};
    }
    console.log('Email sent:', info.messageId);
    return {success: info.messageId}
  });

}


export default sendResetPasswordEmail