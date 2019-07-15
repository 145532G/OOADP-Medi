const Sequelize = require('sequelize');
const db = require('../config/DBConfig');

const consultation= db.define('consultation',{
    queue_num: {
        type: Sequelize.INTEGER
    },
    date: {
        type: Sequelize.DATE
    }
    
});
module.exports = consultation;