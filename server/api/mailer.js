const nodeMailer = require('nodemailer');
const fs = require('fs');

const senEmail = async (receiverAddress) => {
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'phoenixmailer3',
            pass: 'ebqp iixn yzqy zzsd'
        }
    });

    let fileContents = fs.readFileSync('F:/React/React/chess/server/api/register-email-body.html', 'utf-8');

    let emailBody = fileContents.replace('REPLACE_OTP', gererateOTP());

    let mailOptions = {
        from: 'phoenixmailer3@gmail.com',
        to: receiverAddress,
        subject: 'Email Verification',
        html: emailBody
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                resolve(info.response);
            }
        });
    });
}

const gererateOTP = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {senEmail};
