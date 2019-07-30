// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const SymptomQuestion = db.define('symptomquestion', {
    question: {
        type: Sequelize.STRING
    },
    answer_yes: {
        type: Sequelize.STRING
    },
    answer_no: {
        type: Sequelize.STRING
    },
});

module.exports = SymptomQuestion;