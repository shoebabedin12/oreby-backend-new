const bcrypt = require('bcrypt');
const User = require("../models/usersModel");
const emailValidation = require('../helpers/emailValidation');
const sendEmail = require('../helpers/sendEmail');
const otpTemplate = require('../helpers/otpTemplate');
const { aleaRNGFactory } = require('number-generator');

const registrationController = async (req, res) =>{
    const { fullName, email, password} = req.body;
    
    if (!fullName) {
        return res.send({error: "Enter Name"})
    }else if (!email) {
        return res.send({error: "Enter Email"})
    }else if (!emailValidation(email)) {
        return res.send({error: "Enter a valid Email"})
    }else if (!password) {
        return res.send({error: "Enter Password"})
    }else{
        let duplicateEmail = await User.find({email: email})

        if(duplicateEmail.length > 0){
            return res.send({error: "Email Already exist...Try another email"})
        }


        bcrypt.hash(password, 10, async function(err, hash) {
            const user = new User({
                fullName, 
                email, 
                password: hash
            })

            user.save()
            const generator2 = aleaRNGFactory(Date.now());
            var randomNumber = generator2.uInt32().toString().substring(0, 4)
            const randomOtpStore = await User.findOneAndUpdate({email}, {$set: {randomOtp: randomNumber}}, {new: true})
            sendEmail(email, randomNumber, otpTemplate)

            // setTimeout(async () => {
            //     console.log("OTP deleted");
            //     const randomOtpStore = await User.findOneAndUpdate({email}, {$unset: {randomOtp: ""}}, {new: true})
            // }, 3000);

            res.send({
                success: "Registration successfull...Please check your email for verify",
                fullName: user.fullName,
                email: user.email,
            })
        });
    }
}

module.exports = registrationController;