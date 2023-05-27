const User = require("../models/usersModel");

const emailverificationotpmatchController = async (req, res) =>{
    const {email, randomOtp} = req.body;

    const findOtp = await User.find({email})

    if (findOtp.length > 0) {
        if (randomOtp == findOtp[0].randomOtp) {
            const removeOtpAfterMatch = await User.findOneAndUpdate({email}, {$unset: {randomOtp: ""}}, {new: true})
            res.send({success:"OTP Matched"})
        } else {
            res.send({error:"OTP Not Matched"})
        }
        
    } 
}

module.exports = emailverificationotpmatchController;