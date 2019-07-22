const Sequelize = require('sequelize');
const connection = require('../seqConn');
const User = require('./user');
// can consider use of google api later
// might have to think about timezone 



const Reminder = connection.sequelizeConnection.define('reminder', { //declare table name in first parameter
    // attributes
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING
    },
    location: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    recurrence: { // checks if reminders are repeated
        type: Sequelize.BOOLEAN
    },
    recurrenceFrequency: { // how often it is repeated if recurrence is true
        type: Sequelize.INTEGER
    },
    recurrenceCountMax: { // how many times it should be repeated
        type: Sequelize.INTEGER
    },
    recurrenceCountCurr: { // how many times occured
        type: Sequelize.INTEGER
    },
    date: { 
        type: Sequelize.DATE
    },
    time: {
        type: Sequelize.TIME
    }
}, {
        // options
    });

    Reminder.belongsTo(User);
module.exports = Reminder;