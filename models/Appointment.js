const Sequelize = require('sequelize');
const connection = require('../seqConn');
const User = require('./user');
const MedicalLocation = require('./medicalLocation');

const Appointment = connection.sequelizeConnection.define('appointment', { //declare table name in first parameter
    dateTime: {
        type: Sequelize.DATE
    },
    symptoms: {
        type: Sequelize.STRING
    },
    status: { // Status: Open, Confirmed, Onhold, Closed, Cancelled
        type: Sequelize.STRING,
        defaultValue: "Open"
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
Appointment.belongsTo(User);
Appointment.belongsTo(MedicalLocation);
module.exports = Appointment;