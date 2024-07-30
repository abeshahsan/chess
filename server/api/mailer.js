const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

/**
 * Sends an email with OTP (One-Time Password) to the specified receiver address.
 * @param {string} receiverAddress - The email address of the receiver.
 * @returns {Promise<Object>} - A promise that resolves to an object containing information about the sent email, the generated OTP, and the mail options.
 * @throws {Error} - If there is an error while sending the email.
 */
const sendEmailWithOTP = async (receiverAddress) => {
    try {
        let transporter = nodeMailer.createTransport(TRANSPORTER_CONFIG);
        let { emailBody, otp } = generateEmailBody();
        let mailOptions = generateMailOptions(receiverAddress, 'OTP for registration', emailBody);

        let info = await sendEmail(transporter, mailOptions);
        return { info, otp, mailOptions };

    } catch (error) {
        console.log(error);
        throw error;
    }
}


/**
 * Configuration object for the email transporter.
 * @type {Object}
 * @property {string} service - The email service to be used (e.g., 'gmail').
 * @property {Object} auth - The authentication credentials for the email service.
 * @property {string} auth.user - The username or email address.
 * @property {string} auth.pass - The password or application-specific password.
 */
const TRANSPORTER_CONFIG = {
    service: 'gmail',
    auth: {
        user: 'phoenixmailer3',
        pass: 'ebqp iixn yzqy zzsd'
    }
};

/**
 * Creates and returns the mail options object for sending an email.
 *
 * @param {string} receiverAddress - The email address of the receiver.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The body of the email.
 * @returns {object} The mail options object.
 */
const generateMailOptions = (receiverAddress, subject, body) => {
    return {
        from: 'phoenixmailer3@gmail.com',
        to: receiverAddress,
        subject: subject,
        html: body
    };
}


/**
 * Generates an email body and OTP (One-Time Password).
 *
 * Reads the email body from a file and replaces a placeholder with the generated OTP.
 *
 * @returns {Object} An object containing the generated email body and OTP.
 */
const generateEmailBody = () => {
    let otp = gererateOTP();
    let emailBody = fs.readFileSync(path.join(__dirname, 'register-email-body.html'), 'utf8');
    emailBody = emailBody.replace('REPLACE_OTP', otp);
    return { emailBody, otp };
}


/**
 * Sends an email using the provided transporter and mail options.
 * @param {Object} transporter - The email transporter object.
 * @param {Object} mailOptions - The options for the email.
 * @returns {Promise<Object>} A promise that resolves to the information about the sent email.
 */
const sendEmail = async (transporter, mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
}



/**
 * Generates a random OTP (One-Time Password) consisting of 8 alphanumeric characters.
 * @returns {string} The generated OTP.
 */
const gererateOTP = () => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    let charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = { sendEmailWithOTP };
