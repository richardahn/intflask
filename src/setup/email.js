const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendVerificationEmail(user, verificationLink) {
  return await transporter.sendMail({
    from: 'Intflask Account Verification <donotreply@intflask.com>',
    to: user.email,
    subject: 'Verify your email',
    html: `Please verify your email by clicking on this <a href="${verificationLink}">link</a>.`,
  });
}

module.exports = {
  transporter,
  sendVerificationEmail,
};
