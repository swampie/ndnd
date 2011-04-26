
/**
 * Module dependencies.
 */

var express = require('express');
var model = require(__dirname + '/model/model');
var host = process.env.VCAP_APP_HOST || 'localhost';
var port = process.env.VCAP_APP_PORT || 3000

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('APP_PORT',3000); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
  app.set('APP_PORT',process.env.VMC_APP_PORT);
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Express'
  });
});

app.get('/login',function(req,res){
	res.render('login',{title:'Please Login'});
});

app.get('/register',function(req,res){
	res.render('register',{title:'Please register',errors:null});	
});

app.post('/register',function(req,res){
	var userParams = req.body.user;
	var errors = [];
	if(!userParams.username || userParams.username == ''){
		errors.push('Username could not be empty');
	}
	if(!userParams.password || userParams.password == ''){
		errors.push('Password could not be empty');
	}
	console.log(errors.length);
	if(errors.length > 0){
		res.render('register',{title:'Please register',user:userParams,			errors:errors});
	}else{
		res.render('index',{title:'Express'})
	}
	
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(port,host);
  console.log("Express server listening on port %d", app.address().port);
}
