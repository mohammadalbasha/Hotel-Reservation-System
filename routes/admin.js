const express=require('express');

const router=express.Router();

const adminController = require ('../controllers/admin');
const auth = require ('../middleware/auth');


// https://localhost:8080/admin/addHotel
//this for add Hotel
// all information in req.body
router.post('/addHotel',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.postAddHotel);



// https://localhost:8080/admin/getHotel            
router.get('/getHotels',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.getHotels);

// https://localhost:8080/admin/getHotel:34kjjdkc876324234sskc            
router.get('/getHotel/:hotelId',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.getHotelById);

// https://localhost:8080/admin/getUsers            
router.get('/getUsers',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.getUsers);            

// https://localhost:8080/admin/blockingUser/skjh8723rjsdbjk7823
router.get('/blockingUser/:userId',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.blockingUser);    

// https://localhost:8080/admin/editHotel/kjsbfhj87326783 
router.put('/editHotel/:hotelId',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.editHotel);    

       // https://localhost:8080/admin/editRoom/kjsbfhj87326783 
router.put('/editRoom/:roomId',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.editRoom);    


// https://localhost:8080/admin/editFeature/kjsbfhj8s7326783 
router.put('/editFeature/:featureId',
            auth.isLoggedIn,
            auth.isAdmin,
            adminController.editFeature);    



module.exports=router;