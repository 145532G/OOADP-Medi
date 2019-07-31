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
    userLevel: {
        type: Sequelize.STRING,
        defaultValue: "Patient"
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    salutation: {
        type: Sequelize.STRING
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY
    },
    sex: {
        type: Sequelize.STRING
    },
    race: {
        type: Sequelize.STRING
    },
    height: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    bloodType: {
        type: Sequelize.STRING
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
        type: Sequelize.INTEGER
    },
    primaryContactNum: {
        type: Sequelize.INTEGER
    },
    mobileContactNum: {
        type: Sequelize.INTEGER,
        unique: true
    }
}, {
    // options
});
module.exports = User;