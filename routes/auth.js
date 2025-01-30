const express = require('express');
const User = require('./../models/userModel');
const { generateOTP, sendOTPEmail } = require('./../utils/otp');

const router = express.Router();

let tryCount;

// 📌 Route: Send OTP to Email
router.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    let name;
    let password;
    const users = await User.findOne({ email });

    if (users) {
      name = users.name;
      password = users.password;
    }

    if (req.body.name) {
      name = req.body.name;
    }

    if (req.body.password) {
      password = req.body.password;
    }

    // Generate OTP & Expiry Time
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // Expires in 5 minutes

    // Store OTP in Database
    await User.updateOne(
      { email },
      { otp, otpExpires, name, password },
      { upsert: true }
    );

    // Send OTP via Email
    await sendOTPEmail(email, otp, name);
    tryCount = 3;

    res.json({ status: 'success', message: 'OTP sent to email!' });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
});

// 📌 Route: Verify OTP

router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      tryCount--;
      if (tryCount > 0) {
        return res.status(400).json({
          status: 'fail',
          message: `Invalid or expired OTP You have ${tryCount} more attempts `,
        });
      } else {
        tryCount = 3;
        await User.deleteOne({ email });
        return res.status(400).json({
          status: 'fail',
          message: `Invalid or expired OTP You have Exceeded Your attempts. Create account from first`,
        });
      }
    }

    // OTP is valid, clear OTP fields
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.json({
      status: 'success',
      message: 'OTP verified! You can proceed with registration.',
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
});

module.exports = router;
