const express=require('express');

const router=express.Router();

const reservationController = require ('../controllers/reservation');
const auth = require ('../middleware/auth');

// https://localhost:8080/reservation/addBook
// you should pass checkIn checkOut roomId in requrest.body
router.post ('/addBook',
            auth.isLoggedIn,
            reservationController.addBook);

// https://localhost:8080/reservation/getAvailableHotels/england/22-8-2015/22-2-2020?page=1
// queries      ?page=1 this for pagination
// params   country checkIn checkOut  
router.get ('/getAvailableHotels/:country/:checkIn/:checkOut',
             reservationController.getAvailableHotelsInSpecifecDateAndCountry);
 


             
// https://localhost:8080/reservation/getHotels?page=2
// https://localhost:8080/reservation/getHotels?country=england&page=2
// https://localhost:8080/reservation/getHotels?country=england&page=2&offer=1
//  add ?page=pageNummber for pagination
// if you want specific country add ?country=countryName in request queries
// if you want hotels with offers add ?offer=1 in request queries
router.get ('/getHotels',
             reservationController.getHotels);

// https://localhost:8080/reservation/getMyOrders
router.get ('/getMyOrders',
            auth.isLoggedIn,
            reservationController.getMyOrders);


 // https://localhost:8080/reservation/cancellingOrder/akjn323432klddjlk2
// orderId would be passed in req.params
router.get ('/cancellingOrder/:orderId',
            auth.isLoggedIn,
            reservationController.cancellingOrder);

router.post ('/editOrder/:orderId',
            auth.isLoggedIn,
            reservationController.editOrder);

// UserId,HotelId should be passed in req.body
router.post ('/addNote/:hotelId',
            auth.isLoggedIn,
            reservationController.addNote);

router.get('/getNotes/:hotelId',
            reservationController.getNotes);

router.get('/getRooms/:orderId',
            reservationController.getRooms);



module.exports=router;
