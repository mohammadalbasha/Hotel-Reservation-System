
const dates = require('../assests/dates');
const Room = require ('../models/Room');
const Hotel = require('../models/Hotel');
const Order = require('../models/Order');
const Note = require ('../models/Notes');
const {ObjectId} = require ('mongodb');
const User = require('../models/User');
const { mongodb } = require('../keys/keys');

// const nodemailer = require('nodemailer');

// const sendgridTransport = require('nodemailer-sendgrid-transport');


// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//       auth: {
//         api_key:
//           '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'
//       }
//     })
//   );


exports.getAvailableHotelsInSpecifecDateAndCountry = (req,res,next)=>{


    const country ={$regex:req.params.country.toString().toUpperCase()} ;
    const checkIn =new Date(req.params.checkIn);
    const checkOut = new Date(req.params.checkOut);

        console.log(country)    
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let totalItems;

    
    Hotel.find ({country : country})
        .countDocuments()
        .then(count => {
            totalItems = count;
            return  Hotel.find({country : country})
                        .skip((currentPage - 1) * perPage)
                        .limit(perPage)
                        .populate ('rooms features')
                        .exec()
                
                })
        .then (hotelsM => {
            return hotelsM = hotelsM.map (hotel => { 
                return hotel.toObject();
            });
        })
        .then(result=>{

            result.forEach (Element => {

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


            });

             return result;
        })
        .then (hotels => {

            return hotels = hotels.filter(hotel => {
                return dates.availableHotel(checkIn,checkOut,hotel);
            })
        })
        .then (availableHotels => {

            availableHotels.forEach (Element => {
                Element.rooms = Element.rooms.filter(element => {
                    return dates.stillAvailable(checkIn,checkOut,element); 
                });
                
                Element.rooms.forEach (element => {
                    delete element.checks;
                
                })
            });
            res.status(200).json({Hotels:availableHotels,totalItems:totalItems});
        })
        .catch (err=> {
            next(err);
        })
};

exports.getHotels = (req,res,next) => {
    
    const currentPage = req.query.page || 1;
    const perPage = 10;
    let totalItems;

    const country =(req.query.country) ? {$regex:req.query.country.toString().toUpperCase()} : req.query.country;
    const name =(req.query.name) ? {$regex:req.query.name} : req.query.name;


    const offers = req.query.offers;

    Hotel.find({
         $and: [
            {$or: [{undefined: {$eq : country}}, {'country': country}]},
            {$or: [{undefined: {$eq : name}}, {'name': name}]}

        ]
        })
        .countDocuments()
        .then(count => {
            totalItems = count;
            return  Hotel.find({
                        $and: [
                            {$or: [{undefined: {$eq : country}}, {'country': country}]},
                            {$or: [{undefined: {$eq : name}}, {'name': name}]}

                        ]
                        })
                        .skip((currentPage - 1) * perPage)
                        .limit(perPage)
                        .populate ('rooms features')
                        .exec()
                
                })
        .then (hotelsM => {
            return hotelsM = hotelsM.map (hotel => { 
                return hotel.toObject();
            });
        })
        .then(result=>{
            result.forEach (Element => {

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


            });

             return result;
        })
        .then (hotels => {
            hotels.forEach (Element => {    
                Element.rooms.forEach (element => {
                    delete element.checks;   
                })
            });

            if (offers=='1'){
                hotels.filter (hotel => {
                    return hotel.features.offers.websiteOffers>0||hotel.features.offers.hotelOffers>0
                })
            }
            console.log(hotels);
            res.status(200).json({Hotels:hotels,totalItems:totalItems});
        })
        .catch (err=> {
            next(err);
        })



}

exports.addBook = (req,res,next)=>{
    const roomId = new ObjectId (req.body.roomId);
    const checkIn = new Date(req.body.checkIn);
    const checkOut = new Date(req.body.checkOut);
    const userId = req.userId;

    

    let hotelName,roomNumber,roomPrice;
    Room.findOne( {_id:roomId} )
        .then (room => { 

          return  Hotel.findById (room.hotel,{select : {name:1}})
                    .then (hotel => {
                        hotelName = hotel.name;
                        roomNumber = room.number;
                        roomPrice = room.price ;
                        
                        
                    if (dates.stillAvailable(checkIn,checkOut,room))
                    {
                        room.checks.push ( {
                            checkIn : checkIn,
                            checkOut : checkOut,
                            user : userId
                        });

                        const order = new Order ({
                            userId : userId,
                            checkIn : checkIn,
                            checkOut : checkOut,
                            hotel : room.hotel,
                            room : { 
                                roomId : roomId,
                                number : room.number,
                                price : room.price
                            }

                        });

                        return User.findById(userId)
                                    .then (user => {
                                        user.orders.push (order._id);
                                        return Promise.all ([room.save(), order.save()],user.save());

                                    });

                    }
                    const error = new Error('room Not Available or booked at this,sorry');
                    error.statusCode = 404;
                    throw error;       
                
                })     
        })
        .then (result => {
            //User.findById(userId)
            //.select('email')
            //.then(email => {
                // transporter.sendMail({
            //     to: email,
            //     from: 'HRB',
            //     subject: 'booking',
            //     html: `
            //    <h2> booking successfully </h2>
             //   <p> ${result}</p>
            //     `
            //   });
      

            //})
             
            res.status(200).json(result);
        })
        .catch (err => {
            if (!err.statusCode)
                err.statusCode=500;
            next(err);    
        })   

}

// exports.addLocalBook = (req,res,next) => {
//     const roomId = new ObjectId (req.body.roomId);
//     const checkIn = new Date(req.body.checkIn);
//     const checkOut = new Date(req.body.checkOut);
//     const user = req.user;

//     let hotelName,roomNumber,roomPrice;

//     Room.findOne( {_id:roomId} )
//         .then (room => { 

//           return  Hotel.findById (room.hotel,{select : {name:1}})
//                     .then (hotel => {
//                         hotelName = hotel.name;
//                         roomNumber = room.number;
//                         roomPrice = room.price ;
                        
                        
//                     if (dates.stillAvailable(checkIn,checkOut,room))
//                     {
//                         room.checks.push ( {
//                             checkIn : checkIn,
//                             checkOut : checkOut,
//                             user : userId
//                         });

//                         const order = new Order ({
//                             userId : userId,
//                             checkIn : checkIn,
//                             checkOut : checkOut,
//                             hotel : room.hotel,
//                             room : { 
//                                 number : room.number,
//                                 price : room.price
//                             }

//                         });

//                         return User.findById(userId)
//                                     .then (user => {
//                                         user.orders.push (order._id);
//                                         return Promise.all ([room.save(), order.save()],user.save());

//                                     });

//                     }
//                     const error = new Error('room Not Available,sorry');
//                     error.statusCode = 404;
//                     throw error;       
                
//                 })     
//         })
//         .then (result => {

            
      
//             res.status(200).json(result);
//         })
//         .catch (err => {
//             if (!err.statusCode)
//                 err.statusCode=500;
//             next(err);    
//         })   


// }


exports.getMyOrders = (req,res,next) => {
    Order.find({userId:ObjectId(req.userId)})
        .populate('hotel')
        .then (result => {
            res.status(200).json(result);
        })
        .catch (err=> {
            next (err);
        })
};

exports.cancellingOrder = (req,res,next) => {

    const orderId = new ObjectId(req.params.orderId);
    let roomId;
    let checkIn;
    let hotelName,roomNumber;

    Order.findById(orderId)
        .then (order => {
            if (!order)
            {
                const error = new Error ("could not find this order.");
                error.statusCode = 404;
                throw error;
            }
            if (order.userId.toString()!==req.userId.toString())
            {
                const error = new Error ("You Are Not Authorithed!");
                error.statusCode = 401; //checkit
                throw error;
            }

            roomId = order.room.roomId;
            checkIn = order.checkIn;
            hotelName = order.hotel;
            roomNumber = order.room.number;
            return Order.findByIdAndDelete(orderId);

        })
        .then (deletedOrder => {
            return Room.findById(roomId)
                        .then (room => {
                            room.checks.filter (element => {
                                return dates.compare(element.checkIn,checkIn)!==0;
                            });
                            return room.save();
                        });

        })
        .then (result => {
  

  
            res.status(200).json({
                message : "order cancelled successfully"
            })
        })
        .catch (err => {
            next (err);
        });
};

exports.editOrder = (req,res,next) => {
    const orderId = new ObjectId(req.params.orderId) ;
    const roomId = new ObjectId(req.body.roomId) ; 
    const checkIn = new Date (req.body.checkIn);
    const checkOut = new Date ( req.body.checkOut);
    const userId = req.userId;

    Order.findById(orderId)
         .then (order => {
             if (order.userId.toString() !== userId.toString()){
                const error = new Error('Not Authorithed , you didnt make this book');
                error.statusCode = 401;
                throw error;     
             }

             return  Room.findById(roomId)
                    .then(room => {
                        if (!dates.stillAvailable(checkIn,checkOut,room)){ 
                            const error = new Error('room Not Available or booked at this date,sorry');
                            error.statusCode = 404;
                            throw error;     
                            }
                        else{
                        room.checks.push ( {
                            checkIn : checkIn,
                            checkOut : checkOut,
                            user : userId
                        });
                        room.checks.filter (element => element.checkIn !== order.checkIn);
                        order.checkIn = checkIn;
                        order.checkOut = checkOut;
                        return Promise.all([room.save(),order.save()]);
                        } 
                    })
                    .then (success => {
                        res.status(200).json(success);
                    })
                    .catch(err => {
                        next(err);
                    })
            })
            .catch(err => {
                next(err);
            })  
        
}

exports.addNote = (req,res,next) => { 
 
    const hotelId = ObjectId (req.params.hotelId); 
    Order.find({userId : ObjectId (req.userId),
                hotel : hotelId})
         .then (result => {
             if (result.length === 0) {
                const error = new Error ("Cannot add a note  on this Hotel, you didn't book yet");
                error.status = 401;
                throw error;
             }

             const note = new Note ({
                 evaluating : req.body.evaluating,
                 notes : req.body.notes,
                 userId : ObjectId (req.userId),
                 suggestions : req.body.suggestions,
                 hotelId : hotelId
             })
             return note.save();

         })
         .then (result => {
             res.status(200).json ('note added successfully');
         })
        .catch (err => {
            next(err);
        })   
}

exports.getNotes = (req,res,next) => {
    const hotelId = ObjectId(req.params.hotelId);
    Note.find({hotelId : hotelId})
        .populate('userId')
        .then (notes => {
            res.status(200).json(notes);
        })      
        .catch(err => {
            next(err);
        })
}

exports.getRooms = (req,res,next) => {
    const orderId = new ObjectId(req.params.orderId);
    Order.findById(orderId)
        .select('hotel')
        .then (order => {
            Hotel.findById(order.hotel)
            .populate ('rooms features')
            .exec()
         
            .then (hotel => {
                return hotel.toObject();
            })
            .then(Element=>{


               return Element.rooms= Element.rooms.map (element => {
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


            })
            .then (rooms => {
                res.status(200).json(rooms);
            })
            .catch(err => {
                next(err);
            })

        })
        .catch(err => {
            next(err);
        })

        
}