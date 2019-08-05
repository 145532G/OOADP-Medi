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
    },
    medicine_cost: {
        type: Sequelize.INTEGER
    }

});
module.exports = medicine;