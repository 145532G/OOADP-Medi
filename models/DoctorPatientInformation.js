const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Doctor = connection.sequelizeConnection.define('doctor', {
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