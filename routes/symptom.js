const symptom = require('../models/Symptom')
const express = require('express');
const router = express.Router();

router.get('/symptom', (req, res) => {
    res.render('./templates/symptomanswers');
});

// router.post('/symptom', (req, res) => {
//     let 
// })

