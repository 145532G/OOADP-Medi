const Sequelize = require('sequelize');
const connection = require('../seqConn');

const DebitCard = connection.sequelizeConnection.define('debitcard', {
    debitcardtype: {
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
        type: Sequelize.DATE
    },
    cardVerify: {
        type: Sequelize.STRING
    }
});

module.exports = DebitCard;