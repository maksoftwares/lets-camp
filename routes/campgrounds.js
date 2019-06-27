var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX ROUTE - SHOW ALL CAPMGROUNDS
router.get("/",function(req,res){
    Campground.find({},function(err,campdata){
        if(err){
            console.log("ERROR!");
        }else{
            res.render("campgrounds/index",{campgrounds:campdata});
        }
    })
});
//CREATE - ADD NEW CAMPGROUND TO THE DATABASE
router.post("/",middleware.isLoggedIn,function(req,res){
    //getting data from form
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var newCampgrounds = {name : name , price : price , image : image,description : description,author : author};
    //Create a new capmground and save to database
    Campground.create(newCampgrounds,function(err,newlyCreated){
        if(err){
            console.log("ERROR!!");
        }else{
            req.flash("success","Campground Added.");
            res.redirect("/campgrounds");
        }

    })
});
//NEW - SHOW FORM TO ADD NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});
//SHOW -  Shows more info about campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log("ERROR!!");
        }else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground : foundCampground});
        }
    });
});

//Edit Capmground Route
router.get("/:id/edit",middleware.checkUserOwnership,function(req,res){
    Campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            res.redirect("/campgrounds");
        } else {
        res.render("campgrounds/edit",{campground : foundCampground});        
        } 
    });         
});

//Update Campground Route
router.put("/:id",middleware.checkUserOwnership,function(req,res){
    Campground.findOneAndUpdate(req.params.id , req.body.campground, function(err, updatedCampground){
        if(err) {
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Campground updated.");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkUserOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else {
            req.flash("success","Campground removed.");
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;