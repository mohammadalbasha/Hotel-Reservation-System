const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

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
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"

    }, (accessToken, refreshToken, profile, done) => {


        // check if user already exists in our own db
        // User.findOne({googleId: profile.id}).then((currentUser) => {
        //   console.log('kaka');
        //     if(currentUser){
        //         // already have this user
        //         console.log('user is: ', currentUser);
        //         done(null, currentUser);
        //     } else {
        //
        //       console.log("a;dlcjlksdml;cms");
        //         // if not, create user in our db
        //         new User({
        //             googleId: profile.id,
        //             username: profile.displayName,
        //             thumbnail: profile._json.image.url
        //         }).save().then((newUser) => {
        //             console.log('created new user: ', newUser);
        //             done(null, newUser);
        //         });
        //     }
        done(null, profile);
        // });

    })
);
