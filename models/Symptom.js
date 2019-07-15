// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const Symptom = db.define('symptom', {
    counter: {
        type: Sequelize.STRING
    },
    question: {
        type: Sequelize.STRING
    },
    answer_one: {
        type: Sequelize.STRING
    },
    answer_two: {
        type: Sequelize.STRING
    },
    answer_three: {
        type: Sequelize.STRING
    },
    answer_four: {
        type: Sequelize.STRING
    },
});

module.exports = Symptom;