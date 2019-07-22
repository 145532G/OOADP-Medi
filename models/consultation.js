const Sequelize = require('sequelize');
const connection = require('../seqConn');

const consultation= connection.sequelizeConnection.define('consultation',{ 
    userId: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
    
});
module.exports = consultation;