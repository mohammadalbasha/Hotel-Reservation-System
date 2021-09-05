const router = require('express').Router();
const passport = require('passport');
const jwt = require ('jsonwebtoken');
// auth login
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// auth with google+
router.get('/google', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/userinfo.profile']}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/cb', passport.authenticate('google',{session:false}), (req, res) => {

  const token =jwt.sign(
                 {
                 user : req.user },
                 'cristianoronaldo',
                 {expiresIn:'1h'}
             );
             res.status(200).json({ token: token });

    //res.redirect('/profile');
});

module.exports = router;
