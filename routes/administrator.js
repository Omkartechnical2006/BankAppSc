const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bankDetails');
}
main();

//render administrator
router.get("/", async(req, res) => {
    let {AuthId}=req.signedCookies;
    if(!AuthId || AuthId!="%5%ab%@as%uta%asa%j"){
        res.render("adminForm.ejs");
    }else{
        let users = await User.find();
            res.render("administrator.ejs", { users });
    }
});

router.post("/",async (req, res) => {
    let myUserName = "omkar";
    let myPass = "sharmaji";
    let { username, password } = req.body;
    if (!username || !password) {
        res.send("sorry, you haven't access");
    } else {
        if ((username === myUserName) && (password === myPass)) {
            res.cookie("AuthId","%5%ab%@as%uta%asa%j",{signed:true, expires: new Date(Date.now()+(3*24*60*60*1000))});
            let users = await User.find();
            res.render("administrator.ejs", { users });
        } else {
            res.send("wrong username or password");
        }
    }
});


module.exports = router;