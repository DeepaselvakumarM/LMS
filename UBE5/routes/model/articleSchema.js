const mongoose=require('mongoose');

const articleSchema = new mongoose.Schema({
    title:{
        type:String
    },
    content:{
        type:String
    }
}, 
{ timestamps: true }
);


const article=mongoose.model('article',articleSchema);
module.exports=article;
