const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    Id:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    Title :{
        type:String,
        required:true
    },
    Discription:{
        type:String,
        required:true
    },
},
{
    timestamps:true
})

const Blogmodel = mongoose.model('Blog',blogSchema);

module.exports= Blogmodel