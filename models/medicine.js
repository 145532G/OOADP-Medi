const Sequelize = require('sequelize');
const db = require('../config/DBConfig');


const medicine = db.define('medicine', {
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