const Sequelize = require('sequelize');
const connection = require('../seqConn');

const consultation = require('../models/consultation')
const medicine = require('../models/medicine')

const con_med = connection.sequelizeConnection.define('con_med', {
    consultation_id : {
        type: Sequelize.INTEGER
    },
    medicine_id: {
        type: Sequelize.INTEGER
    },
    description: {
        type: Sequelize.STRING
    },
    
    

});

module.exports = con_med;