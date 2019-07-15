// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Symptom = db.define('symptomanswer', {result_symptom: {
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