const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  role : {
    type : String,
    enum : ['Admin','User','Local','Owner'],
    required : true
  },

  email : {
    type : String,
    index : {
      unique : true,
      partialFilterExpression : {email: {$type: "string"}}
    }
  },

  securityNumber : {
    type : String,
    index : {
      unique : true,
      partialFilterExpression : {securityNumber: {$type: "string"}}
    }
    
  },

  ownerCode : {
    type : String,
    index : {
      unique : true,
      partialFilterExpression : {ownerCode: {$type: "string"}}
    }
    
  },

  googleId : {
    type : String,
    index : {
      unique : true,
      partialFilterExpression : {googleId: {$type: "string"}}
    }
  },

  password : {
    type : String,
  },

  fullName : {
    type : String,
    required : true
  },

  phoneNumber : {
    type : String,
    index : {
      unique : true,
      partialFilterExpression : {phoneNumber: {$type: "string"}}
    }
  },

  isActive : {
    type : Schema.Types.Boolean,
    required : true
  },

  orders : [
    {
      type : Schema.Types.ObjectId,
      ref : 'Order'
    }
  ] 
    
  


});

module.exports = mongoose.model('User', userSchema);
