const symptom = require('../models/Symptom');
const express = require('express');
const router = express.Router();

router.get('/symptom', (req, res) => {
    symptom.findAll({
        })
        .then((result)=>{
            res.render('./templates/symptom',{
                result
            });
    })
});


router.post('/symptomInsert', (req, res) => {
    let question = req.body.symptomquestioninsert;
    console.log(question)
    symptom.create({
        question,
    })
    .then(symptom => {
        console.log(symptom);
        res.redirect('/symptom/symptomInsert');
    })
    .catch(err => console.log(err))
});


router.get('/symptomInsert', (req, res) => {
    symptom.findAll({
        })
        .then((result)=>{
            console.log(symptom);
            res.render('./templates/symptomInsert',{
                result
            });
        })
        .catch(err => console.log(err))
});


router.get('/symptomInserttemp', (req, res) => {
    symptom.create({
        Symptom,
        Symptom_Description,
        List,
        result_symptom,
        result_text,
        result_recommend,
        SymptomTempList,
    });
    res.render('./templates/symptomanswers');
});

router.get('/symptomRecording', (req, res) => {
    symptom.findAll({
        })
        .then((result)=>{
            res.render('./templates/symptomRecording',{
                result
            })
        })
});

// router.post('/symptom', (req, res) => {
//     let 
// })

module.exports = router;
