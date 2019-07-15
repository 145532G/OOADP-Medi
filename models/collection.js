// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const MedicineCollection= db.define('collection',{
    name: {
        type: Sequelize.STRING
    },
    nric: {
        type: Sequelize.STRING
    },
    queue_num: {
        type: Sequelize.INTEGER
    },
    medicine: {
        type: Sequelize.STRING
    }
});
module.exports = MedicineCollection;