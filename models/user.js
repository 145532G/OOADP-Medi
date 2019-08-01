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
    image:{
        type: Sequelize.STRING
    },
    firstName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true

        }
    },
    lastName: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true

        }
    },
    salutation: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['Mx', 'Ms','Mr','Dr','Mrs']]

        }
    },
    dateOfBirth: {
        type: Sequelize.DATEONLY
    },
    sex: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['Male', 'Female']]

        }
    },
    race: {
        type: Sequelize.STRING,
        validate: {
            isAlpha: true

        }
    },
    height: {
        type: Sequelize.INTEGER
    },
    weight: {
        type: Sequelize.INTEGER
    },
    bloodType: {
        type: Sequelize.STRING,
        validate: {
            isIn: [['A+','A-','B+', 'B-','AB+','AB-','O+','O-']]

        }
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