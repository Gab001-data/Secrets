//jshint esversion:6
require('dotenv').config();
const express= require("express");
const bodyParser= require("body-parser");
const ejs= require("ejs");
const mongoose= require("mongoose");
const user= require(__dirname+"/model/model.js");

const app= express();
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{console.log("connection to database successful")});


app.get("/", function(req,res){
    res.render("home");
});
app.get("/register", function(req,res){
    res.render("register");
});
app.post("/register", function(req,res){
    const newUser= new user(req.body);
    newUser.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Account registeration successful")
            res.redirect("/login");
        }
    })
});
app.get("/login", function(req,res){
    res.render("login");
});
app.post("/login", (req,res)=>{
    const oldUser=req.body;
    user.findOne({username:oldUser.username}, function(err,foundUser){
        if(err){
            console.log(err);
        }else{
            if(foundUser){
                if(foundUser.password===oldUser.password){
                    res.render("secrets");
                }
            }
        }
    })

});













app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})