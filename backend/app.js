var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash");
    mysql       = require('mysql'),
    morgan = require('morgan'),
    session  = require('express-session'),
    cookieParser = require('cookie-parser');

require('./config/passport')(passport);
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash());
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
var conn=mysql.createConnection({
host:"localhost",
user:"root",
password:"",
database:"cfg"
});
    
app.get("/",function(req,res)
{
    res.send("Working !!");
});

app.listen(9000,function()
{
    console.log("Running Server at 3000");
});