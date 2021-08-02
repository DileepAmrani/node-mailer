/* =====================================================
      Importing Necessory Module & Envoirnment Setting
//    ===================================================== */

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var port = process.env.PORT || '3000';
// var cors = require('cors');
var app = express();
var nodemailer = require('nodemailer');

/* =====================================================
            Middleware Will Run on Every Request
   ===================================================== */

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


app.post('/mailSend', mailSend)
function mailSend(req, res) {
    handleSayHello(req, res);
    function handleSayHello(req, res) {
        // create reusable transporter object using the default SMTP transport
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'name@gmail.com', // Your email id
                pass: '' // Your password
            }
        });
        // var text = 'Hello your reservation confirmed. Your Slot Number is' + req.headers.slotno + ' \n\n' + req.headers.from;
        var text = 'User submited information:' + ' \n' + 'Name: ' + req.body.name + ' \n' + 'Email: ' + req.body.email + ' \n' + 'Contact: ' + req.body.contact + ' \n' + 'Country: ' + req.body.country + ' \n' + 'City: ' + req.body.city + ' \n' + 'Number: ' + req.body.number + ' \n' + 'Message: ' + req.body.message;
        var mailOptions = {
            from: 'no-reply@tola.com', // sender address
            to: 'dear_majid01@yahoo.com', // list of receivers
            subject: 'Your respective user email', // Subject line
            text: text // plaintext body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.json({ Err: error });
            } else {
                console.log('Message sent: ' + info.response);
                res.json({ Success: info.response });
            };
        });
    }
}



/* =====================================================
                      Server Listen
   ===================================================== */

app.listen(port, function () {
    console.log("server is listening on port : ", port);
}).timeout = 25000;
