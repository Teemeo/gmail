// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "captainteemeo@gmail.com",
//         pass: "B01647235437"
//     }
// });

// var mailOption = {
//     from:'captainteemeo@gmail.com',
//     to:'jsluck8vn@gmail.com',
//     subject:'alo2',
//     text:`chao anh nha`,
// }
// transporter.sendMail(mailOption, function(error,info){
//     if(error){
//         console.log(error);
//     }
//     else{
//         console.log('Email sent: '+info.response);
//     }
// });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Captain Teemeo<br><br>😃👻😃👻😃👻😃👻😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Luck8vn"<example.gimail.com>', // sender address
    to: details.email, // list of receivers
    subject: "Thông Tin Khách Hàng Đăng Ký", // Subject line
    html: `
    <h1>Thông tin khách hàng cần tư vấn!</h1>
    <h1>Họ tên: ${user.name}</h1><br>
    <h1>SĐT: ${user.numberphone}</h1><br>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}

// main().catch(console.error);
