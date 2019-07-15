const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const UserModel = require('../models/user');
/*
router.get 2 parameters (directory, arrowfunction )
arrowfunction 2 parameters (req,res) => {

};
 */

router.get('/', (req, res) => {
    const title = 'OOADP1';
    res.render('index', { title: title }) // renders views/index.handlebars
});

router.get('/dashboard', (req, res) => {
    userinfo = req.user;
    if (userinfo){ // if user found
        console.log(userinfo)
    res.render('dashboard',{userinfo});
    } 
    else{
        res.render('unauthorised',{message:'Unauthorised user.'})
    }

});

router.get('/register', (req, res) => {
    res.render('register');
});




router.post('/registrationaction', (req, res) => {
    const UserModel = require('../models/user');
    //email dont need to check as its done by seq
    //check for password
    if (req.body.password === req.body.cfmpassword) {
        bcrypt.genSalt(10, function (err, salt) {
            // bcrypt.hash(passwordToStore, saltThatWasGenerated) (errorobj, salt+saltedpassword)
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                // Store hash in your password DB.
                // salt not required to be saved as it is somewhat combined in hash
                UserModel.create({
                    email: req.body.email,
                    password: hash
                }).then(function () { // renders only when sucessful
                    res.render('registrationresult', {
                        "registrationStatus": "Successful.",
                        "message": "User created successfully."
                    });
                }).catch(function (error) { // catch the error, consolelog error and render fail
                    res.render('registrationresult', {
                        "registrationStatus": "Unsuccessful.",
                        "message": "User creation fail."
                    });
                    console.log("Error message:", error.message); //Need to create function to catch uniques since its not a supported validator- done, custom validator
                });
            });
        });
    }
    else {
        res.render('registrationresult', {
            "registrationStatus": "Unsuccessful.",
            "message": "User creation fail."
        });
    }





});

router.get('/login', (req, res) => {
    res.render('login');
    res.clearCookie("user_id");
});


// Login Form POST => /user/login
router.post('/loginaction', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: './dashboard', // Route to /video/listVideos URL
        failureRedirect: './login', // Route to /login URL
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logOut(); //cookies on client will not be cleared but invalidated by passportjs
    res.redirect('/');
})


router.all('/profileupdate/:user_id', (req, res) => {
    var user_id = req.params.user_id;

    UserModel.findOne({
        where: { id: user_id }
    }).then(userResult => {
        res.render('profileupdate', { userResult });
    });
});

router.post('/profileupdatesubmit', (req, res) => {

    UserModel.update({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateofbirth: req.body.dateofbirth,
        sex: req.body.sex,
        ethnicity: req.body.ethnicity,
        height: req.body.height,
        weight: req.body.weight,
        country: req.body.country,
        identificationNumber: req.body.identificationNumber,
        address: req.body.address,
        postalCode: req.body.postalCode,
        mobileNumber: req.body.mobileNumber,
        password: req.body.password
    }, {
            where: { id: req.body.id }
        }).then(userResult => {
            res.redirect('profileupdate/' + req.body.id);
        });
});

router.get('/profiledelete/:user_id', (req, res) => {
    var user_id = req.params.user_id;

    UserModel.destroy({
        where: { id: user_id }
    }).then(
        res.redirect('../')
    );
});

router.get('/profile', (req, res) => {
    res.render('profile');
});


router.get('/appointments', (req, res) => {
    res.render('appointments');
});

router.get('/doctorConsultation', (req, res) => {
    res.render('./templates/doc_consult');
});

router.get('/collection', (req, res) => {
    res.render('./templates/collection');
});

router.get('/symptom', (req, res) => {
    res.render('./templates/symptomchecker');
});

router.get('/symptomanswer', (req, res) => {
    res.render('./templates/symptomanswers');
});

router.get('/patientinformation', (req, res) => {
    res.render('./templates/patientinformation');
})






module.exports = router;