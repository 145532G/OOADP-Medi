const express = require('express');
const router = express.Router({ mergeParams: true });
const Queue = require('../models/QueueNo');
const alertMessage = require('../helpers/messenger');
var count = 1;

router.get('/queueNumber', (req, res) => {
    Queue.findAll({
        raw: true
    }).then((queues) => {
        res.render('./templates/queueNumber', {
            queues: queues
        })
    })
        .catch(err => console.log(err))
});

router.post('/queueNumber', (req, res) => {
    let name = req.body.name;
    let nric = req.body.nric;
    let travelOption = req.body.travelOption;
    let queueNo = count;
    let counterNo = Math.floor((Math.random() * 10) + 1);
    Queue.create({
        name,
        nric,
        travelOption,
        queueNo,
        counterNo
    }).then(queue => {
        alertMessage(res, 'success', 'Queue Added', 'fa fa-check', true);
        res.redirect('/queue/queueNumber');
        count += 1;
    })
        .catch(err => console.log(err))
})


module.exports = router;