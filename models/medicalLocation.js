const Sequelize = require('sequelize');
const connection = require('../seqConn');

const Location = connection.sequelizeConnection.define('location', { //declare table name in first parameter
    name: {
        type: Sequelize.STRING
    },
    icon: {
        type: Sequelize.STRING
    },
    detail: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    clinic: {
        type: Sequelize.STRING
    }
}, {
    // options
});
module.exports = Location;