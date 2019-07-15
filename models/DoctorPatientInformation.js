// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Doctor = db.define('doctor', {
    consultation_symptom: {
        type: Sequelize.STRING
    },
    consultation_prescription: {
        type: Sequelize.STRING
    },
    consultation_comments: {
        type: Sequelize.STRING
    },
});

module.exports = Doctor;