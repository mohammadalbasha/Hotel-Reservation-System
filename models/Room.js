const mongoose=require('mongoose');
const Hotel  = require('./Hotel');

const Schema=mongoose.Schema;

const RoomSchema = new Schema({

    number : {
        type : Number,
        required : true
     },
     
    hotel : {
        type : Schema.Types.ObjectId,
        ref : 'Hotel',
        required : true
    },

    available : {
        type : Boolean,
        required : true
    },

    price : {
        type : Number,
        required : true
     },

     size : {
         type : Number,
         required : true
     },

    type : {
        type : String,
        enum : ['vip','normal','sweet'],
        required : true
     },
    
     checks : [
         {
        checkIn : {
            type : Schema.Types.Date,
            required : true
        },

        checkOut : {
            type:Schema.Types.Date,
            required : true
        },

        user : {
            type:Schema.Types.ObjectId, 
            ref : 'User',
            required : true
        }
        }
    ]



});

module.exports=mongoose.model('Room',RoomSchema);