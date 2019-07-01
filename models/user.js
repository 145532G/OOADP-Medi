// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');

const User = connection.sequelizeConnection.define('user', { //declare table name in first parameter
    // attributes
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // unique works only if you drop previous created table
        validate: {
            isEmail: true
            //check for unique,remake modal

        }
    },
    password: {
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY
    },
    sex: {
        type: Sequelize.STRING
    },
    ethnicity: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    country: {
        type: Sequelize.STRING
    },
    identificationNumber: {
        type: Sequelize.STRING,
        unique: true
    },
    address: {
        type: Sequelize.STRING
    },
    postalCode: {
        type: Sequelize.STRING
    },
    mobileNumber: {
        type: Sequelize.STRING
    }
}, {
        // options
    });

module.exports = User;