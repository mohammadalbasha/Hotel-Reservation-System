const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const User = require ('./User');
const Hotel = require ('./Hotel');

const notesSchema = new Schema ({

    hotelId : {
        type : Schema.Types.ObjectId,
        ref : ('Hotel')
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : ('User')
    },
    evaluating : {
        type : Number
    },
    notes : {
        type : String,
    },
    suggestions : { 
        type : String
    }
})

module.exports = mongoose.model('Notes',notesSchema);