const express = require("express");
const router = express.Router();
const { faker } = require('@faker-js/faker');

router.get("/", (req, res) => {
    let { AuthId } = req.signedCookies;
    if (!AuthId || AuthId != "%5%djksa%&@sd%s%7%8%@&") {
        res.render("workerForm.ejs");
    } else {
        const url = `home/${faker.string.uuid()}`;
        res.render("workerControl.ejs", { url });
    }
});

router.post("/", (req, res) => {
    let workerusr = "worker";
    let workerpsw = "worker";
    let { username, password } = req.body;
    if ((!username) || (!password)) {
        res.send("don't try to bother me! Trying to Hack! Best your luck!");
    } else {
        if ((username === workerusr) && (password === workerpsw)) {
            const url = `home/${faker.string.uuid()}`;
            res.cookie("AuthId", "%5%djksa%&@sd%s%7%8%@&", { signed: true, expires: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)) });
            res.render("workerControl.ejs", { url });
        } else {
            res.send("Incorrect username or password, contact to admin to get the username and password");
        }
    }
});
module.exports = router;