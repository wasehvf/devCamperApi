const nodemailer = require("nodemailer");
const { modelName } = require("../model/User");

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(token, email) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "devcamper123@gmaIL.com", // generated ethereal user
      pass: "devcamper1234567", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "devcamper123@gmaIL.com", // sender address
    to: email, // list of receivers
    subject: "Reset Link", // Subject line
    // plain text body
    html: `<b>Hi there! You can reset your password by the following link</b> <a href="">${token} </a>`, // html body
  });

  console.log(info);

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail;
