const express = require('express');
const router = express.Router();
const moment = require('moment');
const Bill = require('../models/BillPayment');
const alertMessage = require('../helpers/messenger');

router.get('/billList', (req, res) => {
    Bill.findAll({
        raw: true
    }).then((bills) => {
        res.render('./templates/billList', {
            bills: bills
        })
    })
        .catch(err => console.log(err))

});

router.get('/billPayment', (req, res) => {
    res.render('./templates/billPayment');
});

router.get('/billList', (req, res) => {
    res.render('./templates/billList');
})

router.post('/billPayment', (req, res) => {
    let prefix = req.body.prefix;
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let country = req.body.country;
    let nric = req.body.nric;
    let email = req.body.email;
    let address = req.body.address;
    let contact_no = req.body.contact_no;
    let payment_method = req.body.payment_method;
    // Multi-value components return array of strings or undefined
    Bill.create({
        prefix,
        first_name,
        last_name,
        country,
        nric,
        email,
        address,
        contact_no,
        payment_method
    }).then(bill => {
        alertMessage(res, 'success', 'Bill record created', 'fa fa-check', true);
        res.redirect('/bill/billList')
    })
        .catch(err => console.log(err))
});

router.get('/creditcard/:id', (req, res) => {
    Bill.findOne({
        where: {
            id: req.params.id
        }
    }).then((bill) => {
        res.render('./templates/creditcard', {
            bill: bill
        });
    }).catch(err => console.log(err));
});

router.put('/saveCreditCard/:id', (req, res) => {
    let creditcardtype = req.body.creditcardtype;
    let debitcardtype = null;
    let accountNo = req.body.accountNo;
    let payAmt = req.body.payAmt;
    let cardNo = req.body.cardNo;
    let cardExpiry = moment(req.body.cardExpiry, 'DD/MM/YYYY');
    let cardVerify = req.body.cardVerify;
    let payment_method = 'Credit Card';
    Bill.update({
        creditcardtype,
        debitcardtype,
        accountNo,
        payAmt,
        cardNo,
        cardExpiry,
        cardVerify,
        payment_method
    }, {
            where: {
                id: req.params.id
            }
        }).then(bill => {
            alertMessage(res, 'success', 'Credit Card Payment Successful', 'fa fa-check', true);
            res.redirect('/bill/billList');
        })
        .catch(err => console.log(err))
});

router.get('/debitcard/:id', (req, res) => {
    Bill.findOne({
        where: {
            id: req.params.id
        }
    }).then((bill) => {
        res.render('./templates/debitcard', {
            bill: bill
        });
    }).catch(err => console.log(err));
});

router.put('/saveDebitCard/:id', (req, res) => {
    let creditcardtype = null;
    let debitcardtype = req.body.debitcardtype;
    let accountNo = req.body.accountNo;
    let payAmt = req.body.payAmt;
    let cardNo = req.body.cardNo;
    let cardExpiry = moment(req.body.cardExpiry, 'DD/MM/YYYY');
    let cardVerify = req.body.cardVerify;
    let payment_method = 'Debit Card';
    Bill.update({
        creditcardtype,
        debitcardtype,
        accountNo,
        payAmt,
        cardNo,
        cardExpiry,
        cardVerify,
        payment_method
    }, {
            where: {
                id: req.params.id
            }
        }).then(bill => {
            alertMessage(res, 'success', 'Debit Card Payment Successful', 'fa fa-check', true);
            res.redirect('/bill/billList');
        })
        .catch(err => console.log(err))
})

router.get('/paypal/:id', (req, res, next) => {
    let payment_method = 'Paypal';
    Bill.update({
        payment_method
    }, {
            where: {
                id: req.params.id
            }
        }).then(bill => {
            res.redirect('https://www.paypal.com/in/signin');
        }).catch(err => console.log(err))
})

router.get('/delete/:id', (req, res, next) => {
    Bill.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id']
    }).then((bill) => {
        if (bill != null) {
            Bill.destroy({
                where: {
                    id: req.params.id
                }
            }).then(() => {
                alertMessage(res, 'info', 'Record deleted', 'fa fa-trash', true);
                res.redirect('/bill/billList');
            }).catch(err => console.log(err));
        }
    })

})

module.exports = router;