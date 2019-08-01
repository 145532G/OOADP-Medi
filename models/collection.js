const Sequelize = require('sequelize');
const connection = require('../seqConn');


const MedicineCollection= connection.sequelizeConnection.define('collection',{
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