/**
 * Module dependancies
 */

 var express  = require('express'),
     mongodb  = require('mongodb'),
     mongoose = require('mongoose'),
     http     = require('http'),
     routes   = require('./routes'),
     db       = require('./models/db')
/**
 * Set up application
 */

 var app = express();
 var dbPath = 'mongodb://localhost/test';

/**
 * Middleware
 */

 app.use(express.bodyParser());
 app.use(express.methodOverride());
 app.use(express.cookieParser());
 app.use(express.session({ secret: 'my secret'}));
 
 app.get('/', routes.index);
 app.get('/login', routes.login);
 app.get('/signup', routes.signup);

/**
 * Specify your views options
 */
 app.set('port', process.env.PORT || 3000);
 app.set('views', __dirname + '/views');
 app.set('view engine', 'jade');
 app.use(app.router);

 //db connection
 mongoose.connect(dbPath);
 
 // CONNECTION EVENTS
 // When successfully connected
 mongoose.connection.on('connected', function () {
   console.log('Mongoose default connection open to ' + dbPath);
 });

 // If the connection throws an error
 mongoose.connection.on('error',function (err) {
   console.log('Mongoose default connection error: ' + err);// If the Node process ends, close the Mongoose connection
});

 // When the connection is disconnected
 mongoose.connection.on('disconnected', function () {
   console.log('Mongoose default connection disconnected');
 });

 // If the Node process ends, close the Mongoose connection
 process.on('SIGINT', function() {
   mongoose.connection.close(function () {
     console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

 http.createServer(app).listen(app.get('port'), function(){
     console.log('Express server listening on port ' + app.get('port'));
 });
