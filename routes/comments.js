var express = require("express");
var router = express.Router({mergeParams:true});
var Comment = require("../models/comment");
var Campground = require("../models/campground");
var middleware = require("../middleware");

//COMMENTS ROUTES
router.get("/new",middleware.isLoggedIn,function(req,res){
    //Find campground by ID
    Campground.findById(req.params.id,function(err ,campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new",{campground : campground});
        }
    });
});

router.post("/",middleware.isLoggedIn,function(req, res){
    //Find campground by ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err,comment){
                if(err){
                    console.log(err);
                } else {
                    //add username to comment
                    comment.author.id = req.user.id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Comment added.");
                    res.redirect("/campgrounds/"+ campground._id);
                }
            });
        }
    });
});

//Edit Route
router.get("/:comment_id/edit",middleware.checkUserCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit",{campground_id : req.params.id, comment : foundComment});
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id",middleware.checkUserCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id , req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        }else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//DESTROY ROUTE
router.delete("/:comment_id",middleware.checkUserCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success","Comment removed.");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});


module.exports = router;