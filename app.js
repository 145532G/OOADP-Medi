//'require' is similar to import used in Java and Python. It brings in the libraries required to be used
const express = require('express');
const exphbs  = require('express-handlebars');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');
const appConfig = require('./config/config');
const passport = require('passport');

const flash = require('connect-flash');
const FlashMessenger = require('flash-messenger');
const { formatDate } = require('./helpers/hbs');
const { radioCheck } = require('./helpers/hbs');
const { ifEquals } = require('./helpers/hbs');
const { ifNotEquals } = require('./helpers/hbs');


//session stuff
const MySQLStore=require('express-mysql-session');
const session = require('express-session');


//Loads routes file main.js in routes directory. The main.js determines which function will be called based on the HTTP request and URL.
const mainRoute = require('./routes/main');
const billRoute = require('./routes/bill');
const queueRoute = require('./routes/queue');

//Creates an Express server - Express is a web application framework for creating web applications in Node JS.
const app = express();

// Bring in database connection
const sequelizeConnection = require('./seqConn');
// Connects to MySQL database
sequelizeConnection.sequelizeSetup(false); // To set up database with new tables(drop all tables) set (true)

const authenticate = require('./config/passport');
authenticate.localStrategy(passport);

// Handlebars Middleware
/*
* 1. Handlebars is a front-end web templating engine that helps to create dynamic web pages using variables
* from Node JS.
*
* 2. Node JS will look at Handlebars files under the views directory
*
* 3. 'defaultLayout' specifies the main.handlebars file under views/layouts as the main template
*
* */
app.engine('handlebars', exphbs({
	helpers: {
		formatDate: formatDate,
		radioCheck: radioCheck,
		ifEquals: ifEquals,
		ifNotEquals: ifNotEquals
	},
	defaultLayout: 'main' // Specify default template views/layout/main.handlebar 
}));
app.set('view engine', 'handlebars');

// Body parser middleware to parse HTTP body in order to read and use HTTP data 
/*
In short; body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with. 
See: https://stackoverflow.com/questions/38306569/what-does-body-parser-do-with-express
*/
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

// Creates static folder for publicly accessible HTML, CSS and Javascript files i.e localhost/css /js
app.use(express.static(path.join(__dirname, 'public')));

// Method override middleware to use other HTTP methods such as PUT and DELETE
app.use(methodOverride('_method'));

// Place to define global variables 
app.use(function (req, res, next) {
	next();
});

//session
app.use(session({
	key:appConfig.applicationConfig.appName+'session_key',
	secret:appConfig.applicationConfig.appName+'session_secret',
	store: new MySQLStore({
		host:appConfig.databaseConfig.host,
		port:appConfig.databaseConfig.port,
		user:appConfig.databaseConfig.user,
		password:appConfig.databaseConfig.password,
		database:appConfig.databaseConfig.schema,
		clearExpired: true,
		// How frequently expired sessions will be cleared; milliseconds:
		checkExpirationInterval: 1000000,
		// The maximum age of a valid session; milliseconds
		expiration: 90000000
	}),
	resave: false,
	saveUninitialized:false,
	cookie: { secure: false }// cookie will not be saved in http if set to true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(FlashMessenger.middleware);

app.use(function(req, res, next){
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});

// mainRoute is declared to point to routes/main.js, This route maps the root URL to any path defined in main.js
app.use('/', mainRoute); 
app.use('/bill', billRoute);
app.use('/queue', queueRoute);

// Starts the server and listen to port configured at appConfig
app.listen(appConfig.applicationConfig.appPort, () => {
	console.log(`Server started on port ${appConfig.applicationConfig.appPort} at: \x1b[36mhttp://localhost:${appConfig.applicationConfig.appPort}\x1b[0m`);
});

