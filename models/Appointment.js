const Sequelize = require('sequelize');
const connection = require('../seqConn');
const User = require('./user');
const MedicalLocation = require('./medicalLocation');

const Appointment = connection.sequelizeConnection.define('appointment', { //declare table name in first parameter
    department: {
        type: Sequelize.STRING
    },
    clinic: {
        type: Sequelize.STRING
    },
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
        type: Sequelize.INTEGER,
    },
    cancelledBy:{
        type: Sequelize.INTEGER,
    },
    urgency: {
        type: Sequelize.STRING
    },
    alternateContactNumber: {
        type: Sequelize.INTEGER
    },
    description:{
        type: Sequelize.STRING
    },
    additionalInformation:{
        type: Sequelize.STRING
    }
}, {
    // options
});
Appointment.belongsTo(User);
Appointment.belongsTo(MedicalLocation);
module.exports = Appointment;