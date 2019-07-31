const symptomquestion = require('../models/SymptomQuestion')
// const symptom (continue later)
const express = require('express');
const router = express.Router();

router.get('/symptomquestion', (req, res) => {
    res.render('./templates/symptomInsert');
});