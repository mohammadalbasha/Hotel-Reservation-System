const jwt = require ('jsonwebtoken');
const Hotel = require('../models/Hotel');


exports.isOwner = (req,res,next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'cristianoronaldo');
    } catch (err) {
      err.statusCode = 500;
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.');
      error.statusCode = 401;
      throw error;
    }
    req.ownerCode = decodedToken.ownerCode;
    Hotel.find({ownerCode : req.ownerCode})
        .then (hotel => {
          if (!hotel ){
            const error = new Error('Not authenticated.');
            error.statusCode = 401;
            throw error;
          }

          
        })

    next();
};

