const Doctor = require('../models/DoctorPatientInformation')
const express = require('express');
const router = express.Router();

router.get('/patientinformation', (req, res) => {
    res.render('./templates/patientinformation');
});

router.post('/patientinformation', (req, res) => {
    let consultation_symptom = req.body.symptomNotes;
    let consultation_prescription = req.body.symptomPrescriptions;
    let consultation_comments = req.body.symptomComments;
    console.log(consultation_comments, consultation_prescription, consultation_symptom);
    Doctor.create({
        consultation_symptom,
        consultation_prescription,
        consultation_comments,
    })
    .then(doctor => {
        console.log(doctor);
        res.redirect('/');
    })
    .catch(err => console.log(err))
});

module.exports = router;