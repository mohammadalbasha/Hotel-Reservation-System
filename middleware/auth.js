const jwt = require ('jsonwebtoken');

const User = require('../models/User');

exports.isLoggedIn = (req,res,next) => {
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
    req.userId = decodedToken.userId;

    User.findById(decodedToken.userId)
        .then (user => {             
            if (user.isActive===false){
              const error = new Error('sorry, You Are Blocked');
              error.statusCode = 401;
              throw error;
            }
        })
        .catch (err => {
          next(err);
        })
    next();

}

exports.isAdmin = (req,res,next) => {
    User.findById (req.userId)
        .then (user => {
            if (user.role !=='Admin'){
                const error = new Error('Admins only can access that.');
                error.statusCode = 401;
                throw error;          

            }
            next();
        })
        .catch (err => {
            if (!err.statusCode)
                err.statusCode=500;
            
            next(err);    
        })

}