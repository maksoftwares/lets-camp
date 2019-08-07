var mongoose = require("mongoose");
//SCHEMA SETUP
var commentSchema = mongoose.Schema({
    text : String,
    author : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username : String
    },
    created : {type : Date,default : Date.now}
});

module.exports = mongoose.model("Comment",commentSchema);