const Sequelize = require('sequelize');
const connection = require('../seqConn');
const userModel = require('./user');

const consultation= connection.sequelizeConnection.define('consultation',{ 
    date: {
        type: Sequelize.DATE
    }
    
    
});
consultation.belongsTo(userModel);
module.exports = consultation;