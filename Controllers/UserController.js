const User = require('../Models/User');
const CryptoJS = require('crypto-js');
const JSONWebToken = require('jsonwebtoken');
exports.Register = async(req,res)=>{
    const {UserName,Password,Email,RollNo} = req.body;
    try{
        req.body.Password = CryptoJS.AES.encrypt(
            Password,
            'aih'
        )
        const TempUser = await User.create(req.body);
        const Token = JSONWebToken.sign(
            {id : TempUser._id},
            'arfa',
            {expiresIn : '24h'}
        )
        res.status(200).json({TempUser,Token})
    }catch(err){
        res.status(500).json(err)
    }
}
exports.Login = async(req,res) => {
    const {UserName,Password} = req.body;
    try{
        const TempUser = await User.findOne({UserName}).select('Password UserName')
        if (!TempUser)
        {
            return res.status(401).json({
                errors : [
                    {
                        param : 'UserName',
                        msg : 'Invalid UserName and Password'
                    }
                ]
            })
        }
        const DPass = CryptoJS.AES.decrypt(
            TempUser.Password,
            'aih'
        ).toString(CryptoJS.enc.Utf8)
        if (DPass != Password){
            return res.status(401).json({
                errors : [
                    {
                        param : 'UserName',
                        msg : 'Invalid UserName and Password'
                    }
                ]
            })
        }
        TempUser.password = undefined;
        const Token = JSONWebToken.sign(
            {id : TempUser._id},
            'arfa',
            {expiresIn : '24h'}

        )
        res.status(200).json({TempUser,Token});

    }catch(err){
        res.status(500).json(err)
    }
}