// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');

const consultation = require('../models/consultation')
const medicine = require('../models/medicine')

const con_med = connection.sequelizeConnection.define('con_med', {
    
    medicine_id: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    
    

});
con_med.belongsTo(consultation)

module.exports = con_med;