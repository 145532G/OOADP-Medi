const Sequelize = require('sequelize');
const connection = require('../seqConn');
const userModel = require('./user');
const appointmentModel = require('./appointment')

const consultation= connection.sequelizeConnection.define('consultation',{ 
    date: {
        type: Sequelize.DATE
    }
    
    
});
consultation.belongsTo(userModel);
consultation.belongsTo(appointmentModel);
module.exports = consultation;