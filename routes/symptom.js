const symptom = require('../models/Symptom');
const express = require('express');
const router = express.Router();

router.get('/symptomInsert', (req, res) => {
    symptom.findOne({
        where: {
            id: req.symptom.id
        }
    })
});


router.get('/symptomInsert', (req, res) => {
    symptom.create({
        Symptom,
        Symptom_Description,
        List,
        result_symptom,
        result_text,
        result_recommend,
        question,
        answer_yes,
        answer_no,
    });
    res.render('./templates/symptomanswers');
});

// router.post('/symptom', (req, res) => {
//     let 
// })

module.exports = router;
