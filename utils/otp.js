const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const generateOTP = () => {
  return otpGenerator.generate(6, { upperCase: false, specialChars: false });
};

const sendOTPEmail = async (email, otp, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'OTP For OnlyMobiles User Registeration',
    text: `Hello ${name}!
Your OTP is: ${otp}. 
It is valid for 5 minutes.


Regards:
OnlyMobiles

powered By DDMailer`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { generateOTP, sendOTPEmail };
