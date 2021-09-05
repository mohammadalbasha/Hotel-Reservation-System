const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    checkIn : {
        type : Schema.Types.Date,
        required : true
    },
    checkOut : {
        type : Schema.Types.Date,
        required : true
    },
    hotel : {
        type :  Schema.Types.ObjectId,
        ref : 'Hotel'
    },
    room : { 
        roomId : {
            type : Schema.Types.ObjectId,
            required : true
        },
        number : { 
            type : Number
        },
        price : {
            type : Number            
        }
    }
});

module.exports = mongoose.model('Order', orderSchema);
