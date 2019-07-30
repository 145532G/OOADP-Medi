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
    let title = 'Medified';

    res.render('index', {
        title,
        userinfo: req.user
    }) // renders views/index.handlebars
});

router.get('/signUp', (req, res) => {
    if (req.user) { // if user is logged in
        res.redirect('dashboard')
    } else {
        res.render('signUp');
    }
});




router.post('/signUpAction', (req, res) => {
    const UserModel = require('../models/user');
    //email dont need to check as its done by seq
    //check for password
    if (req.body.inputPassword.length > 5 && req.body.inputPassword === req.body.inputConfirmPassword) {
        bcrypt.genSalt(10, function (err, salt) {
            // bcrypt.hash(passwordToStore, saltThatWasGenerated) (errorobj, salt+saltedpassword)
            bcrypt.hash(req.body.inputPassword, salt, function (err, hash) {
                // Store hash in your password DB.
                // salt not required to be saved as it is somewhat combined in hash
                UserModel.create({
                    email: req.body.inputEmail,
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
    } else {
        res.render('registrationresult', {
            "registrationStatus": "Unsuccessful.",
            "message": "User creation fail."
        });
    }





});

router.get('/signIn', (req, res) => {
    if (req.user) { // if user is logged in
        res.redirect('dashboard')
    } else {
        res.render('signIn');
    }
});


// Login Form POST => /user/login
router.post('/signInAction', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: './dashboard', // Route to /video/listVideos URL
        failureRedirect: './loginFail', // Route to /login URL
    })(req, res, next);
});

router.get('/loginFail', (req, res) => {
    res.render('signIn', {
        loginStatus: 'Unsucessful login, please try again.'
    });
    res.clearCookie("user_id");
});

router.get('/signOut', function (req, res) {
    req.logOut(); //cookies on client will not be cleared but invalidated by passportjs
    res.redirect('/');
})

router.get('/dashboard', (req, res) => {
    let title = 'Dashboard'
    let userinfo = req.user;
    if (userinfo) { // if user found
        console.log(userinfo)
        res.render('dashboard', {
            title,
            userinfo
        });
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }

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
            where: {
                id: req.body.id
            }
        }).then(userResult => {
            res.redirect('profileupdate/' + req.body.id);
        });
});

router.get('/profiledelete/:user_id', (req, res) => {
    var user_id = req.params.user_id;

    UserModel.destroy({
        where: {
            id: user_id
        }
    }).then(
        res.redirect('../')
    );
});

router.get('/profile', (req, res) => {
    var profileRetrieve = "NULL" // var to tell profile handlebar to retrive and display
    if (!req.user) {
        res.redirect('../')
    } else {
        let profileID = req.user.id
        let age
        UserModel.findOne({
            where: {
                id: profileID
            }
        }).then(userResult => {
            if (userResult.dateOfBirth) {
                age = new Date().getFullYear() - userResult.dateOfBirth.slice(0, 4);
                userDOB = userResult.dateOfBirth.split("-").reverse().join("-"); //format from yyyymmdd to ddmmyyyy
                res.render('profile', {
                    profileRetrieve,
                    userinfo: req.user,
                    userResult,
                    age
                });
            }
            else {
                res.render('profile', {
                    profileRetrieve,
                    userinfo: req.user,
                    userResult
                });
            }
        });
    }
});

router.get('/profileUpdate/:user_id', (req, res) => {
    var profileUpdate = "NULL" // var to tell profile handlebar to update
    const profileUpdateTargetID = req.params.user_id;
    const profileUpdateChangerID = req.user.id;
    const profileUpdateChangerUserLevel = req.user.userLevel;
    if (profileUpdateChangerID == profileUpdateTargetID) {
        res.render('profile',{
            profileUpdate,
            userinfo: req.user
        });
    }
    else if (profileUpdateChangerUserLevel == "Healthcare Admin"){
        res.render('profile',{
            profileUpdate,
            userinfo: req.user
        });
    }

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

router.get('/symptomquestion', (req, res) => {
    res.render('./templates/symptomchecker');
});

router.get('/symptomanswer', (req, res) => {
    res.render('./templates/symptomanswers');
});

router.get('/symptomQuestion', (req, res) => {
    res.render('./templates/symptomInsert');
});

router.get('/symptom', (req, res) => {
    res.render('./templates/symptom');
});

router.get('/patientinformation', (req, res) => {
    res.render('./templates/patientinformation');
})






module.exports = router;