exports.applicationConfig = {
    appName: "Medified",
    appPort: 5000
}

exports.databaseConfig = {
    host: 'localhost',
    schema: 'dbmedified',
    username: 'usermedified',
    password: 'passmedified0'
}

exports.sequelizeConfig = {
    host: exports.databaseConfig.host, // Name or IP address of MySQL server
    dialect: 'mysql', // Tells squelize that MySQL is used
    define: {
        timestamps: false // Don't create timestamp fields in database
    },
    pool: { // Database system params, don't need to know
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

// Declare models that are used here
exports.sequelizeModels = ['user']

/*
exports.sessionConfig = {
    key: 'vidjot_session',
    secret: 'tojiv',
    store: new MySQLStore({
        host: exports.databaseConfig.host,
        port: 3306,
        user: exports.databaseConfig.username,
        password: exports.databaseConfig.password,
        database: exports.databaseConfig.databaseSchema,
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 900000
    }),
    resave: false,
    saveUninitialized: false
}

*/