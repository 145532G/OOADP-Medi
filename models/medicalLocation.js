const Sequelize = require('sequelize');
const connection = require('../seqConn');

const medicalLocation = connection.sequelizeConnection.define('medicalLocation', { //declare table name in first parameter
    country: {
        type: Sequelize.STRING
    },
    state: {
        type: Sequelize.STRING
    },
    timezone: {
        type: Sequelize.INTEGER //timezone where medical location is based in +8gmt for singapore
    },
    name: {
        type: Sequelize.STRING
    },
    icon: {
        type: Sequelize.STRING
    },
    detail: {
        type: Sequelize.STRING
    }
    
}, {
    // options
    timestamps: true,
    paranoid: true // Will not cause destory to remove row in database
});
module.exports = medicalLocation;