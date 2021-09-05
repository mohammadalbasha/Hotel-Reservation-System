const express = require('express');
const router = express.Router();

const reservationController = require ('../controllers/reservation');
const owner = require('../middleware/isOwner');
const ownerController = require('../controllers/owner');
const adminController = require('../controllers/admin');


router.get ('/getHotel',
            owner.isOwner,
            ownerController.getHotel);

// checkIn checkOut roomId should be passed in request.body
//https://localhost:8080/owner/addBook
router.post ('/addBook',
            owner.isOwner,
            ownerController.findOrCreateLocalUser,
            reservationController.addBook);

// room Id should be passes in requrest.params            
// https://localhost:8080/owner/disableRoom/slnckjxndlksmlkdvm
router.get ('/disableRoom/:roomId',
             owner.isOwner,
             ownerController.disableRoom   );

// https://localhost:8080/owner/editRoom/kjsbfhj87326783 
router.put('/editRoom/:roomId',
            owner.isOwner,
            adminController.editRoom);    

// https://localhost:8080/owner/editFeature/kjsbfhj8s7326783 
router.put('/editFeature/:featureId',
            owner.isOwner,
            adminController.editFeature);    


// https://localhost:8080/owner/getClassification
router.get('/getClassification',
            owner.isOwner,
            ownerController.getClassification)

// user Id should be passes in requrest.params            
// https://localhost:8080/owner/getUser/2fwininwoincoi2
router.get('/getUsers/:userId',
            owner.isOwner,
            ownerController.getUser)


// https://localhost:8080/owner/getUsers
router.get('/getUsers',
            owner.isOwner,
            ownerController.getUsers)


// https://localhost:8080/owner/getNotes
router.get('/getNotes',
            owner.isOwner,
            ownerController.getNotes)
           
// https://localhost:8080/owner/getHotelReservationSummary
router.get('/getHotelReservationSummary',
            owner.isOwner,
            ownerController.getHotelReservationSummary)


// roomNumber should be passes in requrest.params            
// https://localhost:8080/owner/getRoomReservationSummary/2
router.get('/getRoomReservationSummary/:roomNumber',
            owner.isOwner,
            ownerController.getRoomReservationSummary)


module.exports = router;