const express = require('express');
const router = express.Router();
const consultation = require('../models/consultation');
const medicine = require('../models/medicine')
const con_med = require('../models/consultation_med')
const alertMessage = require('../helpers/messenger');
const Queue = require('../models/QueueNo');

//router.get('/doctorConsultation', (req, res) => {
    //res.render('./templates/doc_consult');
//});

router.post('/doc_consult', (req, res)=>{
    let queue_num = Queue.findAll({
        where: {
            queue_num: req.params.queueNo
        }
    }); 
    console.log(queue_num)
    let date = new Date;
    /*consultation.create({
        
        queue_num,
        date
        
        
    }).then((consultation) => {
        console.log(consultation);
        var consultation = require('../models/consultation');
        var medicine = require('../models/medicine')
        let consultation_id = consultation.findAll({
            where: {
                id: req.params.id
            }
        })
        let medicine_id = medicine.findAll({
            where: {
                medicine_id: req.params.medicine_id
            }
        })
         
        let description = req.body.description;
        con_med.create({
            consultation_id,
            medicine_id,
            description
        })
    })
    
    
    .catch(err => console.log(err))*/
});

module.exports = router;