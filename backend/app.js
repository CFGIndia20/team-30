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
host:"0.tcp.ngrok.io",
port:19185,
user:"root",
password:"",
database:"cfg"
});
    
app.get("/",function(req,res)
{
	conn.query("select * from users ",function(err,result)
	{
		res.send(result);
	});
});
app.get("/slots",function(req,res)
{
	conn.query("select * from batch,slot where batch.slot_id=slot.id",function(err,result)
	{
		//  res.send(result);
		 res.render("slots.ejs",{result:result});
	});
});
app.post("/slots",function(req,res)
{
	
});	
app.get("/profile",isLoggedIn,function(req,res)
{
    res.send({user:req.user});
});

app.get('/login', function(req, res) {
	res.render('login.ejs', { message: req.flash("Welcome") });
});



app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', 
		failureRedirect : '/login', 
		failureFlash : true
	}),
	function(req, res) {
		console.log("hello");

		if (req.body.remember) {
			req.session.cookie.maxAge = 1000 * 60 * 3;
		} else {
			req.session.cookie.expires = false;
		}
	res.redirect('/');
});

app.get('/signup', function(req, res) {
	res.render('signup.ejs', { message: req.flash("success","Welcome") });
});

app.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/profile',
	failureRedirect : '/signup',
	failureFlash : true
}));
app.get('/logout', function(req, res) {
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect('/');
});
function isLoggedIn(req, res, next) {

	
	if (req.isAuthenticated())
		return next();

	
	req.flash("error","You need to be logged in");
	res.redirect('/');
}
app.listen(8000,function()
{
    console.log("Running Server at 8000");
});