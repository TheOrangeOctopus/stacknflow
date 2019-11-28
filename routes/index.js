const express = require('express');
const router  = express.Router();



/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', {
    user: req.user, layout:false });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;


