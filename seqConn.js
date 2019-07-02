const Sequelize = require('sequelize');
const appConfig = require('./config/config');


// Instantiates Sequelize with database parameters
exports.sequelizeConnection = new Sequelize(
    appConfig.databaseConfig.schema,
    appConfig.databaseConfig.user,
    appConfig.databaseConfig.password,
    appConfig.sequelizeConfig
);

exports.sequelizeSetup = (drop) => {
    exports.sequelizeConnection.authenticate()//Test the connection by trying to authenticate. It runs SELECT 1+1 AS result query.
        .then(() => {
            console.log('Project database connected');
        })
        .then(() => {
            exports.sequelizeConnection.sync({ // Sync all defined models to the DB.(Create tables)
                force: drop
            }).then(() => { //<-- here again
                console.log('Create tables if none exists')
            }).catch(err => console.log(err))
        })
        .catch(err => console.log('Error: ' + err));
};