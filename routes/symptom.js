const symptom = require('../models/Symptom')
const express = require('express');
const router = express.Router();

router.get('/symptomInsert', (req, res) => {
    res.render('./templates/symptomInsert');
});

router.post('/symptomInsert', (req, res) => {
    let 
})

