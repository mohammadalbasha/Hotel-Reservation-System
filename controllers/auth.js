const {validationResult} = require ('express-validator');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
 const nodemailer = require('nodemailer');

 const {nodeMailerAuth} = require('../keys/keys');
// const sendgridTransport = require('nodemailer-sendgrid-transport');

let transporter ;     
// Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //  nodemailer.createTestAccount()
    //  .then (testAccount => {
    //      console.log(testAccount.user,testAccount.pass);

    //     transporter = nodemailer.createTransport({
    //         host: "smtp.ethereal.email",
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         auth: {
    //           user: testAccount.user, // generated ethereal user
    //           pass: testAccount.pass, // generated ethereal password
    //         },
    //       });
    //  });
  
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: nodeMailerAuth
      });
    // create reusable transporter object using the default SMTP transport
    
  
    // send mail with defined transport object
 
  
// var transport = nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "7a3cfdf9a2a3a5",
//       pass: "b7cbfe1c35687b"
//     }
//   });

const User = require ('../models/User');
const Hotel = require('../models/Hotel');

// const transporter = nodemailer.createTransport(
//     sendgridTransport({
//       auth: {
//         api_key:
//           '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'
//       }
//     })
//   );
  
exports.signUp = (req,res,next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors.array());
        const error = new Error ('Validation Failed');
        error.statusCode = 422;
        errors.date = errors.array();
        throw error;
    }


    let role ;
    if (req.url==='/admin/signUp')
        role = 'Admin';
    else if (req.url==='/signUp')
        role = 'User';
            
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    const phoneNumber = req.body.phoneNumber;

    bcrypt
        .hash(password,12)
        .then (hashedPassword => {
            const user = new User ({
                email : email,
                password : hashedPassword,
                fullName : fullName,
                role : role,
                phoneNumber : phoneNumber,
                isActive : true,
                orders : []

            });

            return user.save();            
        })
        .then (result => {
            // var mailOptions = {
            //     from: '"Example Team" <hamoudy00128@hotmail.com>',
            //     to: 'hamoudy00128@hotmail.com',
            //     subject: 'SignUp Successfully',
            //     text: 'Hey there, it’s our first message sent with Nodemailer ',
            //     html : `
            //     signUp success
            //     `
            //     // html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
            //     // attachments: [
            //     //   {
            //     //     filename: 'mailtrap.png',
            //     //     path: __dirname + '/mailtrap.png',
            //     //     cid: 'uniq-mailtrap.png'
            //     //   }
            //     // ]
            //   };
              
            //   transport.sendMail(mailOptions, (error, info) => {
            //     if (error) {
            //       return console.log(error);
            //     }
            //     console.log('Message sent: %s', info);
            //   });
            transporter.sendMail({
                from: '"HRB " <albashamohammad27@gmail.com>', // sender address
                to: "hamoudy00128@hotmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello world?</b>", // html body
              })
              .then (res => {
                  console.log(res);
              });
            // transporter.sendMail({
            //     to: req.body.email,
            //     from: 'HRB',
            //     subject: 'signedUp',
            //     html: `
            //    <h2> signedUp successfull </h2>
            //     `
            //   });
            res.status(201).json("new Admin created successfully");
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode=500;
            next(err);    
        })
    
};

exports.login = (req,res,next) => {

    const email = req.body.email;
    const password = req.body.password;

   
    let loadedUser; 

    User.findOne({email:email})
        .then (user => {

            console.log(user);
            if (!user){
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
            if (!user.isActive){
            const error = new Error('sorry, You Are Blocked');
            error.statusCode = 401;
            throw error;
        }
            if (user.role==='Admin'&&req.url==='/login'||user.role==='User'&&req.url==='/admin/login'){
                const error = new Error('User cannot be found');
                error.statusCode = 401;
                throw error;
            }


        loadedUser=user;
        return bcrypt.compare(password,user.password);
        })
        .then (isEqual => {
            if (!isEqual){
                const error = new Error('Wrong Password.');
                error.statusCode = 401;
                throw error;   
            }

            const token =jwt.sign(
                {
                email : email,
                userId : loadedUser._id
                },
                'cristianoronaldo',
                {expiresIn:'1h'}
            );
            res.status(200).json({ token: token, userId: loadedUser._id.toString() });

        })
        .catch (err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })

};

exports.loginOwner =(req,res,next) => {
    const ownerCode = req.body.ownerCode;

    Hotel.findOne ({ownerCode:ownerCode})
        .then (hotel => {
            if (!hotel){
                const error = new Error('Sorry, Hotel with this code cannot be found');
                error.statusCode = 401;
                throw error;
            }

            const token =jwt.sign(
                {
                 ownerCode : ownerCode,
                },
                'cristianoronaldo',
                {expiresIn:'1h'}
            );
            res.status(200).json({ hotel: hotel ,token: token });


        })

} 

exports.logOut = (req,res,next) => {
   
    // I will add more code here
    res.json({message : "loggedOut"});
}