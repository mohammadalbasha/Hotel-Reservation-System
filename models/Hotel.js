const mongoose=require('mongoose');

const User=require('./User');
const Feature=require('./Features');
const Room=require('./Room');

const Schema=mongoose.Schema;

const hotelSchema = new Schema ({

    name : {
        type : String,
        required : true
     },

     ownerCode : {    
        type : String,
        required : true,
        unique : true
     },

     owner : {
         type : Schema.Types.ObjectId,
         ref : 'User'
     },

     role : {
        type : String,
        enum : ['tour','resid']
     },

     location : {
        
        longitude : {
             type : String  
         },
        
         latitude : {
             type : String
         }

     },

    country : {
        type : String,
        required : true
    },

    imagesUrl : [
        {
        type : String,
        required : true
        }
    ],

    stars : {
        type : Number,
        required : true
    },

    rooms : [
        {
            type : Schema.Types.ObjectId,
            ref : ('Room')
         }
    ],

    features : {
            
        type : Schema.Types.ObjectId,
         ref : ('Feature')
        
        }
    


});

module.exports=mongoose.model('Hotel',hotelSchema);