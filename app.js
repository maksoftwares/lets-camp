var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var underScore = require("underscore");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user")
var seedDB = require("./seeds");
    
    //seedDB();
    mongoose.connect("mongodb+srv://camper:Tcs@1234@letscamp-6fqsr.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser : true});
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(express.static(__dirname + '/public'));
    app.set("view engine","ejs");
    app.use(methodOverride("_method"));
    app.use(flash());

//Requiring routes
var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

//PASSPORT SETUP--------------------------------------------//                                            
app.use(require("express-session")({                        //
    secret : "Arisha is cutest",                            //
    resave : false,                                         //    
    saveUninitialized : false                               //
}));                                                        //
app.use(passport.initialize());                             //  
app.use(passport.session());                                //
passport.use(new localStrategy(User.authenticate()));       //
passport.serializeUser(User.serializeUser());               //
passport.deserializeUser(User.deserializeUser());           //
//----------------------------------------------------------//
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);

var PORT = 3000 || process.env.PORT;

// app.listen(process.env.PORT,process.env.IP,function(){ 
//     console.log("STARTED");
// }); 
app.listen(3000,function(){ 
    console.log("STARTED");
}); 