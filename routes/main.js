const express = require('express');
const router = express.Router();

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
    res.render('dashboard');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/registrationaction', (req, res) => {
    const UserModel = require('../models/user');

    UserModel.create({
        email: req.body.email,
        password: req.body.password
    }).then(function () { // renders only when sucessful
        res.render('registrationresult',{
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

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/loginaction', (req, res) => {
    res.render('');
});

router.get('/profile', (req, res) => {
    res.render('profile');
});



router.get('/reminders', (req, res) => {
    res.render('reminders');
});

router.get('/appointments', (req, res) => {
    res.render('appointments');
});

router.get('/billPayment', (req, res) => {
    res.render('./templates/billPayment');
});

router.get('/creditcard', (req, res) => {
    res.render('./templates/creditcard');
});

router.get('/debitcard', (req, res) => {
    res.render('./templates/debitcard');
});

router.get('/queueNumber', (req, res) => {
    res.render('./templates/queueNumber');
})
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