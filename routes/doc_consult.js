const express = require('express');
const router = express.Router();
const consultation = require('../models/consultation');
const medicine = require('../models/medicine')
const con_med = require('../models/consultation_med')
const Sequelize = require('sequelize');
const Op = Sequelize.Op
const alertMessage = require('../helpers/messenger');
const Queue = require('../models/QueueNo');
const UserModel = require('../models/user');




router.get('/doctorConsultation', (req, res) => {
    medicine.findAll({

    }).then((medicineListResult)=>{
        Queue.findOne({ //find one user where id = userId is in queue
            where: {
                userId: 1 
            },
            include:[UserModel]
        }).then(QueueUserResult=>{
            res.render('./templates/doc_consult',{
                userinfo:req.user,
                result:medicineListResult,
                QueueUserResult
            });
        })

    })

   
});

router.post('/doc_consult', (req, res)=>{
    let userId = req.user.id;
    let date = new Date;
    let description = req.body.description;
    let medicines = req.body.medicine_id;
    let medicine_name = req.body.medicine_name;
   

    
    consultation.create({
        
        userId,
        date
            
            
    }).then((consultation)=>{    
        
        medicine_id = medicines;
        let description = req.body.description;

        medicines.forEach(element => {
            con_med.create({
                
                medicine_id: element,
                description,
                consultationId: consultation.id
            })
        });

       
        res.redirect('/doctorConsultation')
    })
    
    
    
    
        .catch(err => console.log(err))
});






module.exports = router;