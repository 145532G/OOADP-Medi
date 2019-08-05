// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Symptom = connection.sequelizeConnection.define('symptom', {
    Symptom: {
        type: Sequelize.STRING
    },
    Symptom_Description: {
        type: Sequelize.STRING
    },
    List: {
        type: Sequelize.STRING
    },
    result_symptom: {
        type: Sequelize.STRING
    },
    result_text: {
        type: Sequelize.STRING
    },
    result_recommend: {
        type: Sequelize.STRING
    },
    question: {
        type: Sequelize.STRING
    },
    SymptomTempList: {
        type: Sequelize.STRING
    },
});

module.exports = Symptom;