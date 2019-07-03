const express = require('express');
const router = express.Router();
const app = express();

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
    res.clearCookie("user_id");
});

router.post('/loginaction', (req, res) => {
    
    

    UserModel.findOne({where:{email:req.body.email} // isequal to SELECT * FROM user WHERE email = req.body.email
    }).then(userRowResult => {
        //req.session.hello = "HI";
        console.log(JSON.stringify(userRowResult))
        console.log(userRowResult.id)

        res.cookie('user_id',userRowResult.id)
        res.render('dashboard',{userRow:userRowResult});// 
    }).catch(function (error) { // catch if fail, back to login page
        res.render('login', {"loginStatus": "LOGIN FAIL."});
    });
});

router.get('/profileupdate/:user_id', (req, res) => {
    var user_id = req.params.user_id;
    
    UserModel.findOne({where:{id:user_id}
    }).then(userResult=>{
        res.render('profileupdate',{userResult});
    });
});

router.post('/profileupdatesubmit', (req, res) => {

    UserModel.update({
        email:req.body.email,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        dateofbirth:req.body.dateofbirth,
        sex:req.body.sex,
        ethnicity:req.body.ethnicity,
        height:req.body.height,
        weight:req.body.weight,
        country:req.body.country,
        identificationNumber:req.body.identificationNumber,
        address:req.body.address,
        postalCode:req.body.postalCode,
        mobileNumber:req.body.mobileNumber,
        password:req.body.password
    },{where:{id:req.body.id}
    }).then(userResult=>{
        res.redirect('profileupdate/'+req.body.id);
    });
});

router.get('/profiledelete/:user_id', (req, res) => {
    var user_id = req.params.user_id;
    
    UserModel.destroy({where:{id:user_id}
    }).then(
        res.redirect('../')
    );
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