const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, html) => {
  try {
    const isProd = process.env.NODE_ENV === 'production';

    const transporter = nodemailer.createTransport(
      isProd
        ? {
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          }
        : {
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          },
    );

    const info = await transporter.sendMail({
      from: `"VaultPass Support 🚀" < ${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log('Email sent:', info.messageId);

    if (!isProd) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email failed');
  }
};

module.exports = { sendEmail };

//! testing with ethereal
// const nodemailer = require('nodemailer');

// async function sendEmail(to, subject, text) {
//   const testAccount = await nodemailer.createTestAccount();

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: '"VaultPass" <no-reply@vaultpass.com>',
//     to,
//     subject,
//     text,
//   });

//   console.log('Message sent:', info.messageId);
//   console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
// }
