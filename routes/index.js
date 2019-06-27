var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


router.get("/",function(req,res){
    res.render("landing");
});

// AUTH ROUTES

//Show register form
router.get("/register",function(req,res){
    res.render("register");
});

router.post("/register",(req,res)=>{
    var newUser = new User({username : req.body.username});
    User.register(newUser, req.body.password, (err,user)=> {
        if(err){
            req.flash("error",err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res,()=>{
            req.flash("success","Yeah!! Welcome to Let's camp "+user.username);
            res.redirect("/campgrounds");
        });
    });
});

//show login form
router.get("/login",(req,res)=>{
 res.render("login");
});

router.post("/login",passport.authenticate("local",{successRedirect : "/campgrounds",failureRedirect:"/login"}),(req,res)=>{
    res.send("LOGIN");
});

//LOgout Route
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","Logged you out");
    res.redirect("/campgrounds");
});

module.exports = router;