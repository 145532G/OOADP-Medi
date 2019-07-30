const symptomrecord = require('../models/SymptomQuestion')
const express = require('express');
const router = express.Router();

router.get('/symptomquestion', (req, res) => {
    res.render('./templates/symptomInsert');
});