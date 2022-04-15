const nodemailer = require("nodemailer");
const { modelName } = require("../model/User");

async function sendEmail(token, email) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "devcamper123@gmaIL.com",
      pass: "devcamper1234567",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "devcamper123@gmaIL.com", // sender address
    to: email, // list of receivers
    subject: "Reset Link", // Subject line

    html: `<b>Hi there! You can reset your password by the following token</b> <a href="">${token} </a>`, // html body
  });
}

module.exports = sendEmail;
