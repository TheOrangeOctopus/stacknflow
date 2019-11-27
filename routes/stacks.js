const express = require('express');
const router = express.Router();
const Stacks = require('../models/Stack');
const spotifyApi = require("../configs/spotifyApi");
const uploadPictureCloud = require('../configs/cloudinaryImg');
const uploadDocumentCloud = require('../configs/cloudinaryDoc');

// router.get('/', (req, res, next) => {
//   res.render('stacks/show');
// });

// router.get('/:id', (req, res, next) => {
//   Stacks.find({ _id: req.params.id })
//     .then((stackFound) => {
//       res.render('stacks/show', stackFound);
//     }).catch(next())

// });

//Valorar meter un project para quedarnos con lo que nos interesa del objeto
//y ver si hay que popular.
router.post('/filtered', (req, res, next) => {
  Stacks.filter({ category: req.body.category }, { timeInHours: req.body.time }, { tags: { $contains: req.body.tags } })
    .then((stacksFound) => {
      res.render('stacks/filtered', stacksFound);
    })
});


router.get('/new', (req, res, next) => {
  res.render('stacks/new')
})

//revisar si popular , la subida de imagenes y los steps que populen las sources
router.post('/new', (req, res, next) => {
  Stacks.create(req.body).then(createdStack=> {
    res.json({ createdStack, timestamp: new Date() });
  });
})

router.get("/", (req, res, next) => {
  Stacks.find({})
  .sort({"likesCounter": -1})
    .lean()
    .then(allStacks =>
      res.render("stacks/show", { stacks: allStacks })
    )
    .catch(function() {
      next();
      throw new Error("There's an error.");
    });
});

router.get("/adminpanel", (req, res, next) => {
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
});

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
      res.render("stacks/edit", { stack: stackDetail })
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
      status: req.body.status
    }
  )
      .then(updatedStack => {
    res.redirect("/stacks/adminpanel");
  })
}); 

router.get("/:id", (req, res, next) => {
  Stacks.findById(req.params.id)
    .then(stackDetail =>
      res.render("stacks/detail", { stack: stackDetail })
    )
    .catch(function() {
      next();
      throw new Error("Algo no ha ido bien, willy!");
    });
});


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
