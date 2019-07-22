const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Symptom = connection.sequelizeConnection.define('symptomanswer', {result_symptom: {
        type: Sequelize.STRING
    },
    result_text: {
        type: Sequelize.STRING
    },
    result_recommend: {
        type: Sequelize.STRING
    },
});

module.exports = SymptomAnswer;