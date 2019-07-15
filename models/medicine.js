// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');


const medicine = connection.sequelizeConnection.define('medicine', {
    medicine_id : {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    medicine_name: {
        type: Sequelize.STRING
    },
    medicine_description: {
        type: Sequelize.STRING
    }

});
module.exports = medicine;