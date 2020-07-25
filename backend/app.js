var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash");
    mysql       = require('mysql'),
    morgan = require('morgan'),
    cors        = require('cors'),
    session  = require('express-session'),
    cookieParser = require('cookie-parser');

require('./config/passport')(passport);
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use(cors());
app.use(morgan('dev'));
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
    var name="Aditya";
    res.render("index.ejs",{name:name});
    // console.log(req);
    // console.log(req.query.name);
    // res.send("Working");
});

app.listen(8000,function()
{
    console.log("Running Server at 8000");
});