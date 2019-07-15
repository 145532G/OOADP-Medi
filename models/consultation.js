// remember to add filename to config.js under sequelizeModels in order to create table
const Sequelize = require('sequelize');
const connection = require('../seqConn');

const consultation= connection.sequelizeConnection.define('consultation',{
    queue_num: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
    
});
module.exports = consultation;