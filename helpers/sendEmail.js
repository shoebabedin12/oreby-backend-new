const nodemailer = require("nodemailer");

async function sendEmail(email, verify, template) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shoebabedin12@gmail.com",
      pass: "fztlhbrylzrdnjzy", 
    },
  });

  let info = await transporter.sendMail({
    from: 'shoebabedin12@gmail.com',
    to: email, 
    subject: "Hello ✔", 
    text: "Hello world?", 
    html: template(verify), 
  });
}


module.exports = sendEmail;