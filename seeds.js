var mongoose = require("mongoose");
var underScore = require("underscore");
var Campground = require("./models/campground");
var Comment = require("./models/comment.js");


var data = [
    {
        name: "Mountain",
        image : "https://images.unsplash.com/photo-1557474295-714ea5fc2557?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, consequuntur odit. Cum facere quam vero. Ipsam illum assumenda omnis in quisquam sint quae, quod, necessitatibus impedit neque vel praesentium amet. Alias, facere animi et voluptates consectetur modi cumque delectus mollitia commodi numquam nulla fuga, autem temporibus quaerat laboriosam voluptas vitae?" 
    },
    {
        name: "Desert",
        image : "https://images.unsplash.com/photo-1557292882-c911bef21523?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, consequuntur odit. Cum facere quam vero. Ipsam illum assumenda omnis in quisquam sint quae, quod, necessitatibus impedit neque vel praesentium amet. Alias, facere animi et voluptates consectetur modi cumque delectus mollitia commodi numquam nulla fuga, autem temporibus quaerat laboriosam voluptas vitae?" 
    },
    {
        name: "Forest",
        image : "https://images.unsplash.com/photo-1558879177-69cde6b279c7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, consequuntur odit. Cum facere quam vero. Ipsam illum assumenda omnis in quisquam sint quae, quod, necessitatibus impedit neque vel praesentium amet. Alias, facere animi et voluptates consectetur modi cumque delectus mollitia commodi numquam nulla fuga, autem temporibus quaerat laboriosam voluptas vitae?" 
    }
]

function seedDB()
{
    //Remove all campgrounds
    Campground.deleteMany( {},function(err)
    {
        if(err)
        {
            console.log(err);
        } else 
        {
            console.log("REMOVED");
            // add a few campgrounds
            data.forEach(function(seed)
            {
               Campground.create(seed,function(err,campground){
               if(err)
                 {
                    console.log(err);
                  }else 
                 {
                      console.log("Added campground");
                      //Create comment
                        Comment.create(
                          {
                            text : "This place is cool",
                            author : "Stephen"
                        },function(err, comment)
                            {
                            if(err)
                            {
                                console.log(err);
                            } 
                            else
                            {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment!!");
                            }
                        });
                 }   
            });
        });
        }
    });
}


module.exports = seedDB;
