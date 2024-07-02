// make your design responsive for android and tablet and pc as well
//we have to save home/:id so hacker can't full my database.
// admin should have access to delete or modify the user data
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const administrator = require("./routes/administrator.js");
const port = 8080;
const ejsMate = require("ejs-mate");
const home = require("./routes/home.js");
const worker = require("./routes/worker.js");
const cookieParser = require("cookie-parser");
const User = require("./models/user");


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
//middleware for cookieParser to read our cookie;
app.use(cookieParser("%5%sA%fusa%63%5%a%34"));

// connect with mongoDB
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bankDetails');
}
main().then(() => {
    console.log("connected to DB");
}).catch(err => { console.log(err) });

//Root path to redirect on home path
app.get("/", (req, res) => {
    res.redirect("/home");
});


//home path
app.use("/home", home)

//render login page
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.use("/worker",worker);

// administrator path
app.use("/administrator",administrator);

// about path or page
app.get("/about", (req, res) => {
    res.render("about.ejs");
});

 //contact page
app.get("/contact", (req, res) => {
    res.render("contact.ejs")
});

//about page
app.get("/about",(req,res)=>{
    res.render("about.ejs");
});

//logout functionality
app.get("/logout",async(req,res)=>{
    res.cookie("AuthId","",{signed:true,expires:new Date(Date.now())});//1min = 60000ms //1sec=1000ms
    res.redirect("/home");
})

app.delete("/administrator/:id", async(req,res)=>{
    if(!req.signedCookies.AuthId){
        res.redirect("/administrator")
    }else{
        if(req.signedCookies.AuthId==="%5%ab%@as%uta%asa%j"){
    const userData= await User.deleteOne({_id: `${req.params.id}`})
    res.redirect("/administrator");//flash a success message delted sucessfully
        }else{
            res.redirect("/administrator");
        }
    }
});

//edit page
app.get("/administrator",(req,res)=>{
    res.render("edit.ejs");
});

//starting a server
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
