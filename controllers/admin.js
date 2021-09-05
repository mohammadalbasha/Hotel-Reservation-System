const { ObjectId } = require('mongodb');
const mongoose = require ('mongoose');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Feature = require('../models/Features');
const User = require('../models/User');
const { mongodb } = require('../keys/keys');


exports.postAddHotel= (req,res,next) => {

    let files=req.files;
    let imagesUrl =[10];

    for (var i=0;i<10;i++)
    imagesUrl[i]=files[i].path.replace("\\" ,"/");
    

    let hotelData=JSON.parse(req.body.postData);


    const hotel = new Hotel ({
    
        name : hotelData.name,
        country : hotelData.country.toString().toUpperCase(),
        role : hotelData.role,
        stars : hotelData.stars,
        location : hotelData.location,
        imagesUrl : imagesUrl,
        ownerCode : '0000',
        Rooms:[],
        //Features : {}

    });
    hotel.ownerCode = hotel._id.toString();
    const owner = new User ({
        fullName : hotelData.owner.fullName,
        ownerCode : hotel._id.toString(),
        role : 'Owner',
        phoneNumber :  hotelData.owner.phoneNumber,
        email : hotelData.owner.email,
        isActive : true
    });

     Promise.all([hotel.save(),owner.save()])
     .then (completeResult => {
         hotel.owner = completeResult[1];
         return hotel.save();
     })
    .then(hotelRes=>{
     
        let roooms=[];

        for (var i=0;i<hotelData.rooms.length;i++)
            roooms.push({
                number : hotelData.rooms[i].number,
                hotel : hotelRes._id,
                size : hotelData.rooms[i].size,
                price : hotelData.rooms[i].price,
                type : hotelData.rooms[i].type,
                checks : [],
                available : true
            });

        const features = new Feature ({

            hotel : res._id,
            hotelFeatures :  hotelData.features.hotelFeatures,
            roomFeatures : hotelData.features.roomFeatures,
            offers : hotelData.features.offers
        });

        return Promise.all([Room.insertMany(roooms),features.save()]);     
    })
    
    .then (result=>{
              
            result[0].forEach(Element=>{
                hotel.rooms.push(Element);
            })

            hotel.features = {...result[1]};
            

        return hotel.save();
    })

    .then (finalResult=>{
        res.status(201).json(finalResult.ownerCode);
    })

    .catch (err=>{
        next(err);
    })

};

exports.getHotels= (req,res,next) => {
        Hotel
            .find()
            .populate([{ path: "rooms", // populate blogs
                            populate: {
                            path: "checks.user",
                            select : {fullName:1,email:1,phoneNumber:1} // in blogs, populate comments
                    },
                     },
                     'owner',
                     ,'features'])
            .exec()
            .then (hotels => {
                return hotels = hotels.map (hotel => { 
                    return hotel.toObject();
                });
            })
            .then(result=>{
                result.forEach (Element => {

                    Element.rooms= Element.rooms.map (element => {
                        let features;

                        if (element.type==='vip')
                            features = {...Element.features.roomFeatures.vip};
                        
                        else if (element.type==='normal')
                            features = {...Element.features.roomFeatures.normal};    
    
                        else if (element.type==='sweet')
                            features = {...Element.features.roomFeatures.sweet};

                            return {...element,features : features};
                   });


                });

                 return result;
            })
            .then (finalResult => {

                res.status(200).json(finalResult);
            })
            .catch(err=>{
                 console.log(err);
            })


}; 

exports.getHotelById = (req,res,next) => {

        const hotelId = req.params.hotelId;

        Hotel
            .findById(hotelId)
            .populate([{ path: "rooms", // populate blogs
                            populate: {
                            path: "checks.user",
                            select : {fullName:1,email:1,phoneNumber:1} // in blogs, populate comments
                    }
                     }
                     ,'owner',
                     'features'])
            .exec()
            .then (hotel => {
                    return hotel.toObject();
                
            })
            .then(result=>{

                console.log(result);
                    result.rooms= result.rooms.map (element => {
                        let features;

                        if (element.type==='vip')
                            features = {...result.features.roomFeatures.vip};
                        
                        else if (element.type==='normal')
                            features = {...result.features.roomFeatures.normal};    
    
                        else if (element.type==='sweet')
                            features = {...result.features.roomFeatures.sweet};

                            return {...element,features : features};
                   });
                 return result;
            })
            .then (finalResult => {
console.log(finalResult);
                res.status(200).json(finalResult);
            })
            .catch(err=>{
                 console.log(err);
            })


}; 



exports.getUsers = (req,res,next) => {

    User.find(
        {role : 'User'},
        {email : 1,
        fullName:1,
        isActive:1,
        phoneNumber:1,
        googleId:1,
        orders : 1})
        .populate ({
            path : 'orders',
            populate : { 
                path : 'hotel',
                select : { 
                    country : 1,
                    name : 1
                }
            }
        })
        .then (users => {
            res.status(200).json(users);
        })
        .catch (err => {
            next(err);
        })
};

exports.blockingUser = (req,res,next) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then (user => {
            console.log(user);
            user.isActive = 1^user.isActive;
            return user.save();
        })
        .then (result => {
            res.status(200).json ({
                message : 'user blocking/unBlocking done successfully'
            })
        })
        .catch (err => {
            next(err);
        })
};

exports.editHotel = (req,res,next) => {

    const hotelId = req.params.hotelId;
    let hotelData=JSON.parse(req.body.postData);


    const name = hotelData.name;
     const country = hotelData.country;
     const location = hotelData.location;
     const stars = hotelData.stars;
     let imagesUrl = [3];

     let files=req.files;


   
     if (files) {
        for (var i=0;i<3;i++)
        imagesUrl[i] = files[i].path ;  
        }

      if (imagesUrl.length===0) {
        const error = new Error('No files picked.');
        error.statusCode = 422;
        throw error;
      }

     Hotel.findById(ObjectId(hotelId))
          .then (hotel => {

            if (!hotel) {
                const error = new Error('Could not find hotel.');
                error.statusCode = 404;
                throw error;
              }
              hotel.name = name ;
              hotel.country = country ;
              hotel.stars =stars ;
              hotel.location = location ;
              hotel.imagesUrl = imagesUrl;

              return hotel.save();
          }) 
        .then (result => {
        res.status(200).json({
            message : "hotel edited successfully"
            });
        })
    
        .catch (err => {
            next (err);
        })

};

exports.editRoom = (req,res,next) => {
  
    const roomId = req.params.roomId;

    const number = req.body.number ;
    const size = req.body.size ;
    const price = req.body.price ;
    const type = req.body.type ;

    Room.findById(roomId)
        .then (room => {
                
            if (!room) {
                const error = new Error('Could not find room.');
                error.statusCode = 404;
                throw error;
                }

            room.number = number ;
            room.size = size ; 
            room.price = price ;
            room.type = type ;
            
            return room.save();
        })
        .then (result => {
            res.status(200).json({
                message : "room edited successfully"
            });
        })
        .catch (err => {
            next(err);
        })

};

exports.editFeature = (req,res,next) => {
  
    const featureId = req.params.featureId;

    const hotelFeatures = req.body.hotelFeatures ;
    const roomFeatures = req.body.roomFeatures ;
    const offers = req.body.offers ;

    Feature.findById(featureId)
        .then (feature => {
                
            if (!feature) {
                const error = new Error('Could not find feature.');
                error.statusCode = 404;
                throw error;
                }

            feature.hotelFeatures = hotelFeatures ;
            feature.roomFeatures = roomFeatures ; 
            feature.offers = offers ;
            
            return feature.save();
        })
        .then (result => {
            res.status(200).json({
                message : "feature edited successfully"
            });
        })
        .catch (err => {
            next(err);
        })

};

