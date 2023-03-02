const mongoose = require('mongoose');
const {schemaOptions} = require('./ModelOptsTest')
const UserSchemaDef = new mongoose.Schema({
    UserName : {
        type : String,
        required : true,
        unique: true,
        maxlength : 20
    },
    Password : {
        type : String,
        required : true,
    },
    Email : {
        type : String,
        required : true,
    },
    RollNo : {
        type : Number,
        required : true
    }
},schemaOptions)
module.exports = mongoose.model('User',UserSchemaDef)