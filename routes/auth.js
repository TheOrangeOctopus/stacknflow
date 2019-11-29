const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");


// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.post("/login", passport.authenticate("local", {
  successRedirect: "/stacks/",
  failureRedirect: "/auth/signup",
  failureFlash: true,
  passReqToCallback: true
}));

/* router.post("stacks/login", passport.authenticate("local", {
  successRedirect: "/stacks/",
  failureRedirect: "/stacks/",
  failureFlash: true,
  passReqToCallback: true
}));
 */


router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/* router.get("stacks/signup", (req, res, next) => {
  res.render("auth/signup");
}); */

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

    User.findOne({ username }, "username", (err, user) => {
      if (user !== null) {
        res.render("auth/signup", { message: "The username already exists" });
        return;
      }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass
    });

    newUser.save()
    .then(() => {
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});



router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
  
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
  
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/stacks",
    failureRedirect: "/stacks" // here you would redirect to the login page using traditional login approach
  })
);

router.get(
  "stacks/google/callback",
  passport.authenticate("google", {
    successRedirect: "/stacks",
    failureRedirect: "/stacks" // here you would redirect to the login page using traditional login approach
  })
);









module.exports = router;
