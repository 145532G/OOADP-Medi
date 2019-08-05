const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var moment = require('moment');
const alertMessage = require('../helpers/messenger');
const UserModel = require('../models/user');
const ReminderModel = require('../models/reminder')
const AppointmentModel = require('../models/appointment')
const MedicalLocationModel = require('../models/medicalLocation')
const op = require('sequelize').Op
const con_med = require('../models/consultation_med')
const medicine = require('../models/medicine')
/*
router.get 2 parameters (directory, arrowfunction )
arrowfunction 2 parameters (req,res) => {

};
 */

function userLoggedInCheck(){
    if (!req.user){
        res.redirect('/')
    }
    else{
        return false
    }
}

router.get('/', (req, res) => {
    let title = 'Medified';

    res.render('index', {
        title,
        userinfo: req.user
    }) // renders views/index.handlebars
});

router.get('/signUp', (req, res) => {
    if (req.user) { // if user is logged in
        res.redirect('/dashboard')
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
                    alertMessage(res, 'success', 'Account created successfully, Please Sign In.', 'fa fa-check', true);
                    res.render('signIn', {
                        signInAutoEmail:req.body.inputEmail
                    });
                }).catch(function (error) { // catch the error, consolelog error and render fail
                    alertMessage(res, 'danger', 'Unsuccessful, email is already registered.', 'fa fa-check', true);
                    res.render('signUp', {
                        signUpFailEmail:req.body.inputEmail});
                });
            });
        });
    } else {
        alertMessage(res, 'danger', 'Please enter a password more than 6 characters. Please make sure your passwords match', 'fa fa-check', true);
        res.render('signUp',{signUpFailEmail:req.body.inputEmail});
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
        successRedirect: './dashboard',
        failureRedirect: './signIn',
        failureFlash: true
    })(req, res, next);
});

router.get('/signOut', function (req, res) {
    req.logOut(); //cookies on client will not be cleared but invalidated by passportjs
    res.redirect('/');
})

router.get('/dashboard', (req, res) => {
    let title = 'Dashboard'
    let userinfo = req.user;
    if (userinfo) { // if user found
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
                    userDOB,
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
    if (!req.user) {
        res.redirect('../')
    }
    var profileUpdate = "NULL" // var to tell profile handlebar to update
    const profileUpdateTargetID = req.params.user_id;
    const profileUpdateChangerID = req.user.id;
    const profileUpdateChangerUserLevel = req.user.userLevel;
    if (profileUpdateChangerID == profileUpdateTargetID) {
        var patient = "Null"
        UserModel.findOne({
            where: {
                id: profileUpdateTargetID
            }
        }).then(userResult => {
            if (userResult.dateOfBirth) {
                age = new Date().getFullYear() - userResult.dateOfBirth.slice(0, 4);
                userDOB = userResult.dateOfBirth.split("-").reverse().join("-"); //format from yyyymmdd to ddmmyyyy
                res.render('profile', {
                    patient,
                    profileUpdate,
                    userinfo: req.user,
                    userResult,
                    age
                });
            }
            else {
                res.render('profile', {
                    patient,
                    profileUpdate,
                    userinfo: req.user,
                    userResult
                });
            }
        });
    }
    else if (profileUpdateChangerUserLevel == "Healthcare Admin"){
        var healthcareAdmin = "Null"
        UserModel.findOne({
            where: {
                id: profileUpdateTargetID
            }
        }).then(userResult => {
            if (!userResult){
                alertMessage(res, 'danger', 'Profile not found', true); 
                res.redirect('/') //TODO remember to redirect to admin page 
            }
            else if (userResult.dateOfBirth) {
                age = new Date().getFullYear() - userResult.dateOfBirth.slice(0, 4);
                userDOB = userResult.dateOfBirth.split("-").reverse().join("-"); //format from yyyymmdd to ddmmyyyy
                res.render('profile', {
                    healthcareAdmin,
                    profileUpdate,
                    userinfo: req.user,
                    userResult,
                    age
                });
            }
            else {
                res.render('profile', {
                    healthcareAdmin,
                    profileUpdate,
                    userinfo: req.user,
                    userResult
                });
            }
        });
    }
    else{
        res.redirect('/dashboard')
    }

});

router.post('/profileUpdateAction/:user_id', (req, res) => {
    UserModel.findOne({
        where: {
            id: req.params.user_id
        }
    }).then(targetObject =>{
        var updateAllowedAttributes = { // check which attributes are allowed to be changed and pair with form results
            email:req.body.profileUpdateEmail,
            firstName:req.body.profileUpdateFirstName,
            lastName:req.body.profileUpdateLastName,
            salutation:req.body.profileUpdateSalutation,
            dateOfBirth:req.body.profileUpdateDateOfBirth,
            sex:req.body.profileUpdateSex,
            race:req.body.profileUpdateRace,
            height:req.body.profileUpdateHeight,
            weight:req.body.profileUpdateWeight,
            bloodType:req.body.profileUpdateBloodType,
            country:req.body.profileUpdateCountry,
            identificationNumber:req.body.profileUpdateIdentificationNumber,
            address:req.body.profileUpdateAddress,
            postalCode:req.body.profileUpdatePostalCode,
            primaryContactNum:req.body.profileUpdatePrimaryContactNum
        };
        for (var i in updateAllowedAttributes){
            if (updateAllowedAttributes[i]){// update only new attributes that are entered
                targetObject[i] = updateAllowedAttributes[i]
            }
        }
        targetObject.save()
        .then(function(result){
                if (result){
                    alertMessage(res, 'success', 'Profile information updated successfully.', 'fa fa-check', true);
                    res.redirect('/profileUpdate/' + req.params.user_id);
                }
            }).catch(function (error) { // catch the error, consolelog error and render fail
                alertMessage(res, 'danger', 'Unsuccessful:'+error.message, 'fa fa-check', true);
                res.redirect('/profileUpdate/' + req.params.user_id);
                console.log("Error message:", error.message);
            });
    });
});

router.get('/profileRemovalAction/:user_id', (req, res) => {
    var profileRemovalTargetId = req.params.user_id;
    if (req.user.userLevel == "Healthcare Admin"){
        UserModel.destroy({
            where: {
                id: profileRemovalTargetId
            }
        }).then(value =>{
            alertMessage(res, 'success', 'Account removed.', 'fa fa-check', true);
            res.redirect('../')
        });
    }
    else{
        res.redirect('../') // redirect if user level is not enough. 
    }
    
});

router.get('/appointmentMain', (req, res) => {
    let userinfo = req.user;
    if(!userinfo){
        res.redirect('/')
    }
    else{
        AppointmentModel.findAll({ // find everything from appointment table
            where:{
                userId: req.user.id,// where userId field in appointment table equals to current logged in user
                status: "Open" // only show appointments that are open
            },
            order: [
                ['dateTime', 'ASC']
            ],
            include:[MedicalLocationModel]
        }).then(appointmentResult=>{
            //console.log(appointmentResult[0]["medicalLocation"]["name"])
            // splitting dateTime for formatting
            for (i in appointmentResult){
                console.log(appointmentResult[i]["dateTime"])
                appointmentResult[i]["dateOnly"] = moment(appointmentResult[i].dateTime).format('Do MMMM YYYY')
                appointmentResult[i]["timeOnly"] = moment(appointmentResult[i].dateTime).format('hh:mm A')
                appointmentResult[i]["dayOnly"] = moment(appointmentResult[i].dateTime).format('dddd')
                
            }
            res.render('appointmentMain',{
                userinfo,
                appointmentResult
            });
        })
        
    }
});

router.get('/appointmentBooking/:user_id', (req, res) => {
    var appointmentBookingTargetId = req.params.user_id;
    if(req.user.id == req.params.user_id || req.user.userLevel == "Healthcare Admin"){
        MedicalLocationModel.findAll().then(medicalLocationResult =>{
            UserModel.findOne({
                where: {
                    id: appointmentBookingTargetId
                }
            }).then(userResult => {
        
                res.render('appointment', {
                    userinfo: req.user,
                    medicalLocationResult,
                    userResult
                });
            });
        })
    }
    else{
        res.redirect('/')
    }
});

router.post('/appointmentBookingAction', (req,res)=>{
    MedicalLocationModel.findOne({
        where:{
            id: req.body.inputMedicalLocation
        }
    }).then(medicalLocationResult=>{
        let department = req.body.inputDepartment
        let clinic = null
        var dateTime = new Date(req.body.inputDate + " " + req.body.inputTime) // will be converted to UTC in database
        //let dateTime = new moment(originalDateTime).add(medicalLocationResult.timezone, 'h').toDate(); // to account for timezone for locations. nevermind, handlebars will convert back
        let symptoms = null
        let status = "Open"
        let bookedBy = req.user.id
        let urgency = null
        let alternateContactNumber = null
        if (req.body.inputAlternateContactNumber){
            alternateContactNumber = req.body.inputAlternateContactNumber
        }
        let description = null
        if (req.body.inputDescription){
            description = req.body.inputDescription
        }
        let additionalInformation = null
        let userId = req.body.targetUserId
        let medicalLocationId = req.body.inputMedicalLocation
        
        if(req.user.id == req.body.targetUserId || req.user.userLevel == "Healthcare Admin"){
            AppointmentModel.create({
                department,
                clinic,
                dateTime,
                symptoms,
                status,
                bookedBy,
                urgency,
                alternateContactNumber,
                description,
                additionalInformation,
                userId,
                medicalLocationId
    
            }).then(appointmentResult =>{
                alertMessage(res, 'success', 'Appointment booked successfully.', 'fa fa-check', true);
                res.redirect('/appointmentMain');
            })
        }
        else{
            res.redirect('/')
        }
    })
    
})

router.get('/appointmentReschedule/:appointment_id', (req, res) => {
    var appointmentBookingTargetId = req.params.appointment_id;
        MedicalLocationModel.findAll().then(medicalLocationResult =>{
            AppointmentModel.findOne({
                where: {
                    id: appointmentBookingTargetId
                },
                include:[UserModel]
            }).then(appointmentResult => {
                if (req.user.id == appointmentResult["user"].id || req.user.userLevel=="Healthcare Admin"){
                    console.log('test')
                    var appointmentResultMedicalLocationName = medicalLocationResult[(appointmentResult.medicalLocationId -1)].name
                    console.log(appointmentResultMedicalLocationName)
                    var formattedDate = moment(appointmentResult.dateTime).format('YYYY-MM-DD')
                    var formattedTime = moment(appointmentResult.dateTime).format('hh:mm A') // HH for 24 hour format, hh for 12 hour format. mm for minutes MM is for months >:(
                    let userResult = appointmentResult["user"]
                    res.render('appointment', {
                        userinfo: req.user,
                        userResult,
                        medicalLocationResult,
                        appointmentResult,
                        formattedDate,
                        formattedTime,
                        appointmentResultMedicalLocationName
                    });
                }
                else{
                    res.redirect('/')
                }
                
            });
        })
});

router.post('/appointmentRescheduleAction/:appointment_id', (req,res)=>{
    AppointmentModel.findOne({
        where:{
            id: req.params.appointment_id
        },
        include:[UserModel]
    }).then(appointmentResult=>{
        if (req.user.id == appointmentResult["user"].id || req.user.userLevel=="Healthcare Admin"){
            if (req.body.inputAlternateContactNumber){
                appointmentResult.alternateContactNumber=req.body.inputAlternateContactNumber
            }
            if (req.body.inputMedicalLocation){
                appointmentResult.medicalLocationId = req.body.inputMedicalLocation
            }
            if (req.body.inputDepartment){
                appointmentResult.department = req.body.inputDepartment
            }
            
            if (req.body.inputDescription){
                appointmentResult.description = req.body.inputDescription
            }
            if (req.body.inputDate|| req.body.inputTime){
                appointmentResult.dateTime = new Date(req.body.inputDate + " " + req.body.inputTime)
            }
            appointmentResult.save()
            .then(function(result){
                if (result){
                    alertMessage(res, 'success', 'Appointment rescheduled.', 'fa fa-check', true);
                    res.redirect('/appointmentMain/');
                }
            }).catch(function (error) { // catch the error, consolelog error and render fail
                alertMessage(res, 'danger', 'Unsuccessful:'+error.message, 'fa fa-check', true);
                res.redirect('/appointmentMain/');
                console.log("Error message:", error.message);
            });
        }
        else{
            res.redirect('/')
        }
    })
    
})


router.get('/appointmentCancelAction/:appointment_id', (req, res) => {
    AppointmentModel.findOne({
        where:{
            id: req.params.appointment_id
        }
    }).then(result=>{
        if (req.user.userLevel == "Healthcare Admin"){
            AppointmentModel.update({
                status:'Cancelled',
                cancelledBy: req.user.id
            },
            {
                where:{
                    id: req.params.appointment_id
                }
            }).then(value =>{
                alertMessage(res, 'success', 'Appointment cancelled.', 'fa fa-check', true);
                res.redirect('/appointmentMain')
            });
        }
        else if (result.userId == req.user.id){
            AppointmentModel.update({
                status:'Cancelled',
                cancelledBy: req.user.id
            },
            {
                where:{
                    id: req.params.appointment_id
                }
            }).then(value =>{
                alertMessage(res, 'success', 'Appointment cancelled.', 'fa fa-check', true);
                res.redirect('/appointmentMain')
            });
        }
        else{
            res.redirect('../') // redirect if user is not authorized
        }
    })
    
    
});

router.get('/doctorConsultation', (req, res) => {
    res.render('./templates/doc_consult');
});

router.get('/collection', (req, res) => {
    con_med.findAll({
        where: {
            consultationId: 2
        },  
        order:[
            ['medicine_id','asc']
        ],
    


    }).then((result)=>{
        let id = [];
        for (const med of result) {
            id.push(med.medicine_id);
        }

        medicine.findAll({  
            where:{
                medicine_id: {[op.in]: id}
            },
            raw: true
        }).then(data => {
            console.log(data)
            res.render('./templates/collection',{result: data});
        })
        // console.log(result)
        

    })
   
    
});

router.get('/symptomanswer', (req, res) => {
    res.render('./templates/symptomanswers');
});

router.get('/symptomInsert', (req, res) => {
    res.render('./templates/symptomInsert');
});

router.get('/symptom', (req, res) => {
    res.render('./templates/symptom');
});

router.get('/patientinformation', (req, res) => {
    res.render('./templates/patientinformation');
})






module.exports = router;