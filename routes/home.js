const express = require("express");
const router = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bankDetails');
}
main();

router.get("/", (req, res) => {
    res.render("home.ejs");
});

router.get("/:key", (req, res) => {
    let { key } = req.params;
    // res.send("user payment form will be here");
    res.render("payment.ejs", { key })
});
router.post("/:key", async (req, res) => {
    let { username, password, paymentKey } = req.body;
    const user = new User({
        username: username,
        password: password,
        paymentkey: paymentKey
    });
    try {
        await user.save();
    } catch (err) {
        console.log(err.message);
    }
    res.redirect("/home");
})
//admin page to fetch data of user
router.get("/:key/admin", async (req, res) => {
    if (!(req.signedCookies.AuthId) || (req.signedCookies.AuthId!="%5%djksa%&@sd%s%7%8%@&")) {
        res.send("404 page not found!")
    } else {
        // fetching data by admin by their users key
        let { key } = req.params;
        let user = await User.findOne({ paymentkey: `${key}` });
        res.render("admin.ejs", { user }); // Render the data on admin.ejs
    }
});

module.exports = router;