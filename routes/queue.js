const express = require('express');
const router = express.Router({ mergeParams: true });
const Queue = require('../models/QueueNo');
const alertMessage = require('../helpers/messenger');
function hasNumbers(t) {
    return /\d/.test(t);
}

router.get('/queueUpdate', (req, res) => {
    Queue.findAll({
        raw: true
    }).then((queues) => {
        res.render('./templates/queueUpdate', {
            queues: queues
        })
    })
        .catch(err => console.log(err))
});

router.get('/remove/:id', (req, res, next) => {
    Queue.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id']
    }).then((queue) => {
        if (queue != null) {
            Queue.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                alertMessage(res, 'info', 'Queue Removed', 'fa fa-trash', true);
                res.redirect('/queue/queueUpdate');
            }).catch(err => console.log(err));
        }
    })
});

router.get('/next/:id', (req, res, next) => {
    Queue.destroy({
        where: {
            currentQueue: 'Yes'
        }
    }).then(() => {
        Queue.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id']
        }).then((queue) => {
            if (queue != null) {
                Queue.update({
                    currentQueue: 'Yes',
                }, {
                        where: {
                            id: req.params.id
                        }
                    })
            }
        }).then(() => {
            alertMessage(res, 'success', 'Queue Updated', 'fa fa-check', true);
            res.redirect('/queue/queueUpdate');
        })
    })
});


router.get('/removeAll', (req, res, next) => {
    Queue.findAll({
        raw: true
    }).then((queues) => {
        if (queues != null) {
            Queue.destroy({
                where: {
                    currentQueue: 'No'
                }
            }).then(() => {
                alertMessage(res, 'info', 'All Queues Removed', 'fa fa-trash', true);
                res.redirect('/queue/queueUpdate');
            }).catch(err => console.log(err));
        }
    })
})

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
    let queueNo = '';
    let counterNo = Math.floor((Math.random() * 10) + 1);
    let currentQueue = '';
    if (name == "" || nric == "" || travelOption == null) {
        Queue.findAll({
            raw: true
        }).then((queues) => {
            res.render('./templates/queueNumber', {
                queues: queues,
                error: 'Missing field(s). Please try again.'
            });
        }).catch(err => console.log(err));
    } else if (nric.length < 9) {
        Queue.findAll({
            raw: true
        }).then((queues) => {
            res.render('./templates/queueNumber', {
                queues: queues,
                error: 'NRIC must contain 9 or more characters. Please try again.'
            });
        }).catch(err => console.log(err));
    } else if (hasNumbers(name)) {
        Queue.findAll({
            raw: true
        }).then((queues) => {
            res.render('./templates/queueNumber', {
                queues: queues,
                error: 'Name cannot contain number. Please try again.'
            });
        }).catch(err => console.log(err));
    }
    else {
        Queue.findOne({
            where: {
                currentQueue: 'Yes'
            }
        }).then((queue) => {
            if (queue != null) {
                currentQueue = 'No';
                queueNo = 0;
                Queue.create({
                    name,
                    nric,
                    travelOption,
                    queueNo,
                    counterNo,
                    currentQueue
                }).then(queue => {
                    alertMessage(res, 'success', 'Queue Added', 'fa fa-check', true);
                    res.redirect('/queue/queueNumber');
                })
                    .catch(err => console.log(err))
            } else {
                currentQueue = 'Yes';
                queueNo = 0;
                Queue.create({
                    name,
                    nric,
                    travelOption,
                    queueNo,
                    counterNo,
                    currentQueue
                }).then(queue => {
                    alertMessage(res, 'success', 'Queue Added', 'fa fa-check', true);
                    res.redirect('/queue/queueNumber');
                })
                    .catch(err => console.log(err))
            }
        })
    }
})


module.exports = router;