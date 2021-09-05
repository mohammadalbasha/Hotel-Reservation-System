const Hotel = require('../models/Hotel');
const Notes = require('../models/Notes');
const Room = require('../models/Room');
const user = require('../models/User');
const User = require('../models/User');
const Order = require('../models/Order');

const mongodb = require('mongodb');

exports.getHotel = (req,res,next) => {
  Hotel.findOne ({ownerCode : req.ownerCode})
  .populate ([{ path: "rooms", // populate blogs
  populate: {
  path: "checks.user",
//  select : {fullName:1,email:1,phoneNumber:1} // in blogs, populate comments
}
}
,
'features'])
  .exec()
  .then (hotel => {
          return hotel.toObject();
  })
  .then(Element=>{

          Element.rooms= Element.rooms.map (element => {
              let features;
              let imageUrl ; 
              if (element.type==='vip'){
                  features = {...Element.features.roomFeatures.vip};
                  imageUrl = Element.imagesUrl[7];       
               }
              else if (element.type==='normal'){
                  features = {...Element.features.roomFeatures.normal};    
                  imageUrl = Element.imagesUrl[8];
              }
              else if (element.type==='sweet'){
                  features = {...Element.features.roomFeatures.sweet};
                  imageUrl = Element.imagesUrl[9];
              }        
                  return {...element,features : features, imageUrl};
         });

         return   Element;
      

  })

  .then (hotel => {
    console.log(hotel.rooms[1].checks)
      res.status(200).json(hotel);
  })
  .catch (err=> {
      next(err);
  })

   
}
exports.findOrCreateLocalUser = (req,res,next) => {
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;
    const securityNumber = req.body.securityNumber;

    User.findOne ( {
        fullName : fullName,
        securityNumber : securityNumber,
        role : 'Local',
    })
    .then (user => {
        if (user)
        return user;

        user = new User ({
            fullName : fullName,
            securityNumber : securityNumber,
            phoneNumber : phoneNumber,
            role : 'Local',
            isActive : true
        });
        return user.save();

    })
    .then (user => {
        req.userId = user._id;
        next();
    })
    
};

exports.disableRoom = (req,res,next) => {
 
    const roomId = req.params.roomId;
    
    Room.findById(roomId)
    .then (room => {
        if (!room){
            const error = new Eroor ('sorry, Room not found');
            error.status =404;
            throw error;
        }
        room.available = 1^room.available;
        return room.save();
        
    })
    res.status(200).json('disabled successfully')
    .catch (err => {
        next(err);
    })
}

exports.getUsers = (req,res,next) => {
    Hotel.findOne({ownerCode: req.ownerCode.toString()})
    .select('_id')
    .then(result => {
        Order.find({hotel:result})
        .populate('userId')
        .select('userId -_id')
        .then (users => {
            return users.map(ele => {
                return {     _id : ele.userId._id,
                    fullName : ele.userId.fullName,
                    email : ele.userId.email,
                    role : ele.userId.role,
                    securityNumber : ele.userId.securityNumber,
                    googleId : ele.userId.googleId,
                    phoneNumber : ele.userId.phoneNumber,
                    

                }
            }) 
        })
        .then (finalResult => {
          res.status(200).json(finalResult);
        })
        .catch(err => {
          next(err);
        })

    
    })
}

exports.getUser = (req,res,next) => {

    const userId = req.params.userId;
    let hotelId;

    Hotel.findOne({ownerCode : req.ownerCode.toString()})
    .select('_id')
    .then(result => {
        hotelId = result._id;
        User.findById(userId)
        .select('-orders')
        .then (user => {
        console.log(userId);
        return Order.find({userId:mongodb.ObjectID(userId),hotel : mongodb.ObjectID(hotelId) })
                    .then (orders => {
                    return {user,orders : orders}
                    })
    
        })
    
        .then (result => {
        return Notes.find ({userId:mongodb.ObjectID(userId),hotelId :hotelId})
                    .then (notes => {
                        const {user} = result;
                        const {orders}= result;
                        return {user,orders,notes};
                    })
        })
        .then (finalResult => {
        res.json(finalResult)
        })    
    });

}


exports.getClassification = (req,res,next) => {

    Hotel.findOne({ownerId : req.ownerId})
         .select('_id')
         .then(result => {
            return      Note.aggregate([
                           {
                             $match : {hotelId : result._id}
                           },
                           {
                             $group: {
                               // Each `_id` must be unique, so if there are multiple
                               // documents with the same age, MongoDB will increment `count`.
                               _id: '$hotelId',
           
                               count: { $sum: '$evaluating' }
                             }
                           }
                         ])
                             .then (element => {
                               console.log(element);
                               return element[0].count/5;
                            })

                            .catch (err => {
                                next(err);
                            })

                })
            .then (count => {
                res.status(200).json({classification : count}) }) 
                
            .catch (err => {
                next(err);
            })

}

exports.getNotes = (req,res,next) => {

    Hotel.findOne({ownerCode : req.ownerCode.toString()})
    .select('_id')
    .then(result => {
        Notes.find({hotelId : result._id})
            .populate('userId')
            .then (notes => {
                res.status(200).json(notes)
            })      
            .catch(err => {
                next(err);
            })
    })
    .catch(err => {
        next(err);
    })

}

exports.getHotelReservationSummary = (req,res,next) => {

    Hotel.findOne({ownerCode : req.ownerCode.toString()})
    .select('_id')
    .then(result => {
        const hotelId = result._id;
        Order
        .aggregate([
          
          {
            $match : {hotel : hotelId}
          },
          { 
            $project:
              {
                _id: 0,
                checkIn2: { $month: "$checkIn" }
              }
          },
          {
            $group: {
              _id: '$checkIn2',
              count: { $sum: 1 }
            }
          }
        ]).
        then (re=> {
          return re.map (element => {
            switch (element._id)
          {  case(1) :  return   { label: "jan", x: 0, y: element.count };
              break ;
              case(2) :  return   { label: "feb", x: 1, y: element.count };
              break ;
              case(3) :  return   { label: "mar", x: 2, y: element.count };
              break ;
              case(4) :  return   { label: "apr", x: 3, y: element.count };
              break ;
              case(5) :  return   { label: "may", x: 4, y: element.count };
              break ;
              case(6) :  return   { label: "jun", x: 5, y: element.count };
              break ;
              case(7) :  return   { label: "jul", x: 6, y: element.count };
              break ;
              case(8) :  return   { label: "aug", x: 7, y: element.count };
              break ;
              case(9) :  return   { label: "sep", x: 8, y: element.count };
              break ;
              case(10) :  return   { label: "oct", x: 9, y: element.count };
              break ;
              case(11) :  return   { label: "nov", x: 10, y: element.count };
              break ;
              case(12) :  return   { label: "dec", x: 11, y: element.count };
              break ;
          
          }
          });
          })
          .then (result => {
          /*const data = [
              { label: 'jan', x: 0, y: 1 },
              { label: 'feb', x: 1, y: 3 },
              { label: 'mar', x: 2, y: 4 },
              { label: 'Apr', x: 3, y: 3 },
              { label: 'may', x: 4, y: 5 },
              { label: 'jun', x: 5, y: 6 },
              { label: 'jul', x: 6, y: 7 },
              { label: 'Aug', x: 7, y: 10 },
              { label: 'sep', x: 8, y: 10 },
              { label: 'sep', x: 9, y: 4 },
              { label: 'nov', x: 10, y: 3 },
              { label: 'Dec', x: 11, y: 1 }

            ];
            
            
            console.log(result);
            res.json(data);
           */
            
            res.json(result);
          })
          .catch (err => {
              next(err);
          })
       





    })
    .catch(err => {
        next (err);
    })
}

exports.getRoomReservationSummary = (req,res,next) => {
  
    const roomNumber = req.params.roomNumber;

    Hotel.findOne({ownerCode : req.ownerCode.toString()})
    .select('_id')
    .then(result => {
        const hotelId = result._id;

        Order
        .aggregate([
          
          {
            $match : {hotel : hotelId,
                      'room.number' : +roomNumber}
          },
          { 
            $project:
              {
                _id: 0,
                checkIn2: { $month: "$checkIn" }
              }
          },
          {
            $group: {
              _id: '$checkIn2',
              count: { $sum: 1 }
            }
          }
        ]).
        then (re=> {
          return re.map (element => {
            switch (element._id)
          {  case(1) :  return   { label: "jan", x: 0, y: element.count };
              break ;
              case(2) :  return   { label: "feb", x: 1, y: element.count };
              break ;
              case(3) :  return   { label: "mar", x: 2, y: element.count };
              break ;
              case(4) :  return   { label: "apr", x: 3, y: element.count };
              break ;
              case(5) :  return   { label: "may", x: 4, y: element.count };
              break ;
              case(6) :  return   { label: "jun", x: 5, y: element.count };
              break ;
              case(7) :  return   { label: "jul", x: 6, y: element.count };
              break ;
              case(8) :  return   { label: "aug", x: 7, y: element.count };
              break ;
              case(9) :  return   { label: "sep", x: 8, y: element.count };
              break ;
              case(10) :  return   { label: "oct", x: 9, y: element.count };
              break ;
              case(11) :  return   { label: "nov", x: 10, y: element.count };
              break ;
              case(12) :  return   { label: "dec", x: 11, y: element.count };
              break ;
          
          }
          });
          })
          .then (result => {
           
            res.json(result);
          })
          .catch (err => {
              next(err);
          })
       





    })
    .catch(err => {
        next (err);
    })
}