const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false, // 587 হলে false, 465 হলে true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text,
    });

    console.log('Email sent:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Email error:', error);
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