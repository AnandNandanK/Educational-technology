const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.YOUR_API_KEY,
    key_secret: process.env.YOUR_API_SECRET,
});

exports.module=razorpay;