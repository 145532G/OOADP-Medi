const express = require('express');
const router = express.Router();
const moment = require('moment');
const Bill = require('../models/BillPayment');
const alertMessage = require('../helpers/messenger');
function hasNumbers(t) {
    return /\d/.test(t);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function moneyCheck(num) {
    var regex = /^\d+(?:\.\d{0,2})$/;
    return regex.test(num)
}

router.get('/billList', (req, res) => {
    if (req.user) {
        Bill.findAll({
            where: {
                userId: req.user.id
            },
            order: [
                ['id', 'DESC']
            ],
            raw: true
        }).then((bills) => {
            res.render('./templates/billList', {
                bills: bills,
                userinfo: req.user
            })
        })
            .catch(err => console.log(err))
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
});

router.get('/billPayment', (req, res) => {
    if (req.user) {
        res.render('./templates/billPayment', {
            userinfo: req.user
        });
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
});

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
    let userId = req.user.id;
    // Multi-value components return array of strings or undefined
    if (first_name == "" || last_name == "" || country == "" || nric == "" || email == "" || contact_no == "" || payment_method == null) {
        res.render('./templates/billPayment', {
            error: 'Missing field(s). Please try again.',
            userinfo: req.user
        })
    } else if (nric.length < 9) {
        res.render('./templates/billPayment', {
            error: 'NRIC or passport number must contain 9 or more characters. Please try again.',
            userinfo: req.user
        })
    } else if (contact_no.length < 8) {
        res.render('./templates/billPayment', {
            error: 'Contact number must contain 8 or more digits. Please try again.',
            userinfo: req.user
        })
    } else if (hasNumbers(first_name) == true) {
        res.render('./templates/billPayment', {
            error: 'First name cannot contain number. Please try again.',
            userinfo: req.user
        })
    } else if (hasNumbers(last_name) == true) {
        res.render('./templates/billPayment', {
            error: 'Last name cannot contain number. Please try again.',
            userinfo: req.user
        })
    } else if (validateEmail(email) == false) {
        res.render('./templates/billPayment', {
            error: 'Invalid email entered. Please try again.',
            userinfo: req.user
        })
    }
    else {
        if (address == "") {
            address = "Not Stated";
        }
        Bill.create({
            prefix,
            first_name,
            last_name,
            country,
            nric,
            email,
            address,
            contact_no,
            payment_method,
            userId
        }).then(bill => {
            alertMessage(res, 'success', 'Bill record created', 'fa fa-check', true);
            res.redirect('/bill/billList')
        })
            .catch(err => console.log(err))
    }
});

router.get('/creditcard/:id', (req, res) => {
    if (req.user) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            if (!bill) {
                alertMessage(res, 'info', 'Bill record does not exist!', 'fas fa-exclamation-circle', true)
                res.redirect('/bill/billList')
            } else {
                res.render('./templates/creditcard', {
                    bill: bill,
                    userinfo: req.user
                });
            }
        }).catch(err => console.log(err));
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
});

router.get('/creditcard', (req, res) => {
    if (req.user) {
        res.render('./templates/creditcard', {
            userinfo: req.user
        });
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
})

router.get('/debitcard', (req, res) => {
    if (req.user) {
        res.render('./templates/debitcard', {
            userinfo: req.user
        });
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
})

router.put('/saveCreditCard/:id', (req, res) => {
    let creditcardtype = req.body.creditcardtype;
    let debitcardtype = null;
    let accountNo = req.body.accountNo;
    let payAmt = parseFloat(req.body.payAmt).toFixed(2);
    let cardNo = req.body.cardNo;
    let cardExpiry = moment(req.body.cardExpiry, 'YYYY-MM-DD');
    let cardVerify = req.body.cardVerify;
    let payment_method = 'Credit Card';

    if (creditcardtype == null || accountNo == "" || payAmt == "" || cardNo == "" || cardVerify == "") {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'Missing field(s). Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (cardVerify.length != 3) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'Card verification code must only contain 3 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (accountNo.length < 8 || accountNo.length > 19) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'Account number must contain between 8 to 19 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (cardNo.length < 13 || cardNo.length > 19) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'Credit card number must contain between 13 to 19 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (moneyCheck(payAmt) == false) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'Invalid payment amount entered. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (moment(new Date(), 'YYYY-MM-DD').diff(moment(cardExpiry, 'YYYY-MM-DD')) > 0) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/creditcard', {
                bill: bill,
                error: 'You cannot use expired credit card. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else {
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
    }
});

router.get('/debitcard/:id', (req, res) => {
    if (req.user) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            if (!bill) {
                alertMessage(res, 'info', 'Bill record does not exist!', 'fas fa-exclamation-circle', true)
                res.redirect('/bill/billList')
            } else {
                res.render('./templates/debitcard', {
                    bill: bill,
                    userinfo: req.user
                });

            }
        }).catch(err => console.log(err));
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
});

router.put('/saveDebitCard/:id', (req, res) => {
    let creditcardtype = null;
    let debitcardtype = req.body.debitcardtype;
    let accountNo = req.body.accountNo;
    let payAmt = parseFloat(req.body.payAmt).toFixed(2);
    let cardNo = req.body.cardNo;
    let cardExpiry = moment(req.body.cardExpiry, 'YYYY-MM-DD');
    let cardVerify = req.body.cardVerify;
    let payment_method = 'Debit Card';

    if (debitcardtype == null || accountNo == "" || payAmt == "" || cardNo == "" || cardVerify == "") {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'Missing field(s). Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (cardVerify.length != 3) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'Card verification code must only contain 3 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (accountNo.length < 8 || accountNo.length > 19) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'Account number must contain between 8 to 19 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (cardNo.length < 13 || cardNo.length > 19) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'Debit card number must contain between 13 to 19 digits. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (moneyCheck(payAmt) == false) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'Invalid payment amount entered. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else if (moment(new Date(), 'YYYY-MM-DD').diff(moment(cardExpiry, 'YYYY-MM-DD')) > 0) {
        Bill.findOne({
            where: {
                id: req.params.id
            }
        }).then((bill) => {
            res.render('./templates/debitcard', {
                bill: bill,
                error: 'You cannot use expired debit card. Please try again.',
                userinfo: req.user
            });
        }).catch(err => console.log(err));
    } else {
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
    }
})

router.get('/paypal/:id', (req, res, next) => {
    if (req.user) {
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
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
})

router.get('/delete/:id', (req, res, next) => {
    if (req.user) {
        Bill.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id']
        }).then((bill) => {
            if (!bill) {
                alertMessage(res, 'info', 'Bill record does not exist!', 'fas fa-exclamation-circle', true)
                res.redirect('/bill/billList')
            }
            else if (bill != null) {
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
    } else {
        res.render('unauthorised', {
            message: 'Unauthorised user.'
        })
    }
})

module.exports = router;