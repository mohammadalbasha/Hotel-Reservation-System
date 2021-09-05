const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{type:String},
    googleId:{type:String},
    thumbnail: {type:String},
});

const User = mongoose.model('User2', userSchema);

module.exports = User;
