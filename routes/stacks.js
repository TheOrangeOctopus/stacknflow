const express = require('express');
const router = express.Router();
const Stacks = require('../models/Stack');
const spotifyApi = require("../configs/spotifyApi");
const uploadPictureCloud = require('../configs/cloudinaryImg');
const uploadDocumentCloud = require('../configs/cloudinaryDoc');

const LocalStrategy = require("passport-local").Strategy;
const ensureLogin = require("connect-ensure-login");
const passport = require('passport');
const User = require("../models/User");
const bcrypt = require("bcrypt");





router.get("/", (req, res, next) => {
  console.log("Hola peter")
  Stacks.find({})
  .sort({"likesCounter": -1})
    .lean()
    .then(allStacks =>
      res.render("stacks/show", {
        stacks: allStacks,
        user: req.user, 
      })
    )
    .catch(function() {
      res.redirect("/error")
    });
});


//Valorar meter un project para quedarnos con lo que nos interesa del objeto
//y ver si hay que popular.
router.post('/filtered', (req, res, next) => {
  Stacks.filter({ category: req.body.category }, { timeInHours: req.body.time }, { tags: { $contains: req.body.tags } })
    .then((stacksFound) => {
      res.render('stacks/filtered', stacksFound);
    })
});


router.get('/new', (req, res, next) => {
  res.render('stacks/new', { 
    user: req.user })
})

//revisar si popular , la subida de imagenes y los steps que populen las sources
router.post('/new', (req, res, next) => {
  Stacks.create(req.body).then(createdStack=> {
    res.json({ createdStack, timestamp: new Date() });
  });
})







/* router.get("/adminpanel", (req, res, next) => {
  Stacks.find({})
  .sort({"created_at": 1})
    .lean()
    .then(allStacks =>
      res.render("adminpanel", { stacks: allStacks })
    )
    .catch(function() {
      next();
      throw new Error("There's an error.");
    });
}); */

router.get("/:id/delete", (req, res, next) => {
  Stacks.findByIdAndDelete(req.params.id)
    .then(deletedStack => res.redirect("/stacks/adminpanel"))
    .catch(function() {
      next();
      throw new Error("Hmmmmm.... problems!");
    });
});

router.get("/:id/edit", (req, res, next) => {
  Stacks.findById(req.params.id)
    .then(stackDetail =>
      res.render("stacks/edit", { stack: stackDetail,
        user: req.user })
    )
    .catch(function() {
      next();
      throw new Error("Algo no ha ido bien, willy!");
    });
});

router.post("/:id/edit", (req, res) => {
  Stacks.updateOne(
    {_id: req.body._id},
    {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      timeInHours: req.body.timeInHours,
      status: req.body.status,
      user: req.user,
    }
  )
      .then(updatedStack => {
    res.redirect("/stacks/adminpanel");
  })
}); 

router.get("/:id",  (req, res, next) => {
  Stacks.findById(req.params.id)
    .then(stackDetail =>
      res.render("stacks/detail", { 
        stack: stackDetail,
        user: req.user,  })
    )
    .catch(function() {
      next();
      throw new Error("Algo no ha ido bien, willy!");
    });
});
//////////////////////////////////////////////LOGIN///////////////////////////////////
passport.use(
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, next) => {
      User.findOne(
        {
          username
        },
        (err, user) => {
          if (err) {
            return next(err);
          }
          if (!user) {
            return next(null, false, {
              message: "Incorrect username"
            });
          }
          if (!bcrypt.compareSync(password, user.password)) {
            return next(null, false, {
              message: "Incorrect password"
            });
          }

          return next(null, user);
        }
      );
    }
  )
);

passport.serializeUser((user, cb) => {
  console.log("serialize");
  console.log(`storing ${user._id} in the session`);
   cb(null, {id: user._id, rol: user.rol});
});

passport.deserializeUser((id, cb) => {
  console.log("deserialize");
  console.log(`Attaching ${id} to req.user`);
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

function checkRoles(roles) {
  return function(req, res, next) {
    if (req.isAuthenticated() && roles.includes(req.user.rol)) {
      return next();
    } else {
      if (req.isAuthenticated()) {
        res.redirect("/stacks");
      } else {
        res.redirect("/error");
      }
    }
  };
}

const checkAdminOrMod = checkRoles(["admin", "mod"]);
const checkAdmin = checkRoles(["admin"]);


router.get("/adminpanel", (req, res, next) => {
  Stacks.find({})
  .sort({"created_at": 1})
    .lean()
    .then(allStacks =>
      res.render("adminpanel", { 
        stacks: allStacks,
        user: req.user,
        })
    )
    .catch(function() {
      next();
      throw new Error("There's an error.");
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


/////////////////////////////////////////////////APIS//////////////////////////////////

router.get('/spotifyAPI/:query', (req, res, next) => {
  let items = [];
  console.log("Ha entrado en la ruta fuck the system: " + req.params.query)
  spotifyApi.searchTracks(req.params.query,{ limit: 5})
    .then((songs) => {
      console.log(songs.body.tracks.items)
      songs.body.tracks.items.forEach((song) => {
        let fullSong = {
          name: song.name,
          id: song.id,
          uri: song.uri,
          artist: song.artists,
          img: song.album.images
        }
        items.push(fullSong);
      })
    })
    .then(() => {
      res.json(items)
    })

    // res.render('/new',data);
    .catch(err => {
      console.error(err);

    })

})

router.post('/uploadPicture', uploadPictureCloud.single("image"), (req, res, next) => {
  res.json(req.file)  
});

router.post('/uploadDocument', uploadDocumentCloud.single("document"), (req, res, next) => {
  res.json(req.file)  
});




module.exports = router;
