const express = require('express');
const { body } = require('express-validator/check');

const router = express.Router();
const passport = require('passport');
const jwt = require ('jsonwebtoken');

const User = require('../models/User');
const authController = require('../controllers/auth');
const auth =require ('../middleware/auth');


// https://localhost:8080/auth/admin/signUp

 router.put(
     '/admin/signUp',
    [   
        body ('email')
            .isEmail()
            .withMessage ('Please Enter a valid Email')
            .custom ((value,{req}) =>{
            return User.findOne({email:value})
                        .then (user => {
                            if (user)
                            return Promise.reject ('Email already Exist');
                        })
            })
            .normalizeEmail(),

        body ('password',
        'Please enter a password with only numbers and text and at least 5 characters.'
        )
            .trim()
            .isLength({min:5})
            .isAlphanumeric(),

        body('confirmedPassword')
        .trim()
        .custom((value, { req }) => {
            console.log(value,req.body.password);
            if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
            }
            return true;
        }),   

        body ('fullName')   
            .trim()
            .not()
            .isEmpty()
    ],
    auth.isLoggedIn,
    auth.isAdmin,
    authController.signUp);


// https://localhost:8080/auth/signUp 
router.put(
    '/signUp',
    [   
        body ('email')
            .isEmail()
            .withMessage ('Please Enter a valid Email')
            .custom ((value,{req}) =>{
            return User.findOne({email:value})
                        .then (user => {
                            if (user)
                            return Promise.reject ('Email already Exist');
                        })
            })
            .normalizeEmail(),

        body (
            'password',
            'Please enter a password with only numbers and text and at least 5 characters.'
            )
            .trim()
            .isLength({min:5})
            .isAlphanumeric(),

        body('confirmedPassword')
        .trim()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
            }
            return true;
        }),   
        body ('fullName')   
            .trim()
            .not()
            .isEmpty()
    ],
    authController.signUp);
   



// auth with google+
router.get('/google',passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/cb', passport.authenticate('google',{session:false}), (req, res) => {


    const token =jwt.sign(
                    {
                        googleId : req.user.googleId,
                        userId : req.user._id
                     },
                    'cristianoronaldo',
                    {expiresIn:'1h'}
                );
             //   res.status(200).json({ token: token });
                res.redirect(`http://localhost:3000/google/${token}`)
    //res.redirect('/profile');
});    


// https://localhost:8080/auth/admin/login
router.post('/admin/login',authController.login);

// https://localhost:8080/auth/login
router.post('/login',authController.login);

// https://localhost:8080/auth/owner/login
router.post('/owner/login',authController.loginOwner);

router.get('/admin/logOut',authController.logOut);
router.get('/logOut',authController.logOut);



module.exports = router;