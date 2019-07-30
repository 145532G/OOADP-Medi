const Sequelize = require('sequelize');
const connection = require('../seqConn');

const Queue = connection.sequelizeConnection.define('queue', {
    name: {
        type: Sequelize.STRING
    },
    nric: {
        type: Sequelize.STRING
    },
    travelOption: {
        type: Sequelize.STRING
    },
    queueNo: {
        type: Sequelize.STRING
    },
    counterNo: {
        type: Sequelize.STRING
    },
    currentQueue: {
        type: Sequelize.STRING
    }
});

module.exports = Queue;