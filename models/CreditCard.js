const Sequelize = require('sequelize');
const connection = require('../seqConn');

const CreditCard = connection.sequelizeConnection.define('creditcard', {
    creditcardtype: {
        type: Sequelize.STRING
    },
    accountNo: {
        type: Sequelize.STRING
    },
    payAmt: {
        type: Sequelize.STRING
    },
    cardNo: {
        type: Sequelize.STRING
    },
    cardExpiry: {
        type: Sequelize.STRING
    },
    cardVerify: {
        type: Sequelize.STRING
    }
});

module.exports = CreditCard;