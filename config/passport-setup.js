const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('../keys/keys');
const User = require ('../models/User');
// passport.serializeUser((user, done) => {
//
//   console.log(user);
//     done(null, user);
// });
//
// passport.deserializeUser((user, done) => {
//   //  User.findById(id).then((user) => {
//         done(null, user);
//     //});
// });

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/cb',
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
        proxy: true

    }, (accessToken, refreshToken, profile, done) => {
        console.log(profile);
//       done (null,profile);
        // let user = new User ({
        //     fullName : profile.displayName,
        //             googleId : profile.id,
        //             role : 'USER',
        //             phoneNumber : 00000000,
        //             password : 0000000,
        //             isActive : true
             
        // });
        // user.save()
        // .then (res=> {
        //     done (null,res);
        // })
        User.findOne
        ({googleId:profile.id})
        .then (user => {
            if (user)
                return user;
            
            user = new User ({
                fullName : profile.displayName,
                googleId : profile.id,
                role : 'User',
                isActive : true
            }); 
            
            return user.save();                
        })
        .then (user => {
            done(null, user);
        })
        .catch (err => {
            console.log(err);
        })
        
    })
);
