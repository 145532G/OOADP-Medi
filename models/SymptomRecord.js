// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const SymptomRecord = db.define('symptomrecord', {
    // update and add ansered qns and delete everything after everything is done
    List: {
        type: Sequelize.STRING
    },
});

module.exports = SymptomRecord;