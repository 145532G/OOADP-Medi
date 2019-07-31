const Sequelize = require('sequelize');
const connection = require('../seqConn');

const Appointment = connection.sequelizeConnection.define('appointment', { //declare table name in first parameter
    dateTime: {
        type: Sequelize.DATE
    },
    location: {
        type: Sequelize.STRING
    },
    department: {
        type: Sequelize.STRING
    },
    clinic: {
        type: Sequelize.STRING
    },
    symptoms: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    bookedBy: {
        type: Sequelize.STRING
    },
    urgency: {
        type: Sequelize.STRING
    }
}, {
    // options
});
module.exports = Appointment;