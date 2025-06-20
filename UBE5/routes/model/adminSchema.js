const moongose=require('mongoose');

const adminSchema=moongose.Schema({
    Name:{
        type:String
    },
    Password:{
        type:String,
    }
});

const Admin=moongose.model('Admin',adminSchema);
module.exports=Admin;