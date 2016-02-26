
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var data = require('./routes/data');
var index = require('./routes/index');
var login = require('./routes/login');
var create = require('./routes/create');
var joined = require('./routes/joined');
var view = require('./routes/view');
var jsonevents = require('./routes/jsonevents');
var search = require('./routes/search');
var logindata = require('./routes/logindata');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/login', login.view);
app.get('/create', create.view);
app.get('/joined', joined.view);
// app.get('/account', joined.view);
app.get('/view', view.view);
app.get('/jsonevents', jsonevents.view);
app.get('/search', search.view);
app.get('/data', data.data);

// post request to write to JSON file CHANGE HERE
app.post('/data', view.view);

// JSON that holds login user information
app.get('/logindata',logindata.view);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
