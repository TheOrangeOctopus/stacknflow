require('dotenv').config();

const mongoose = require("mongoose");
const Resource = require("../models/Resource");

mongoose
  .connect(`${process.env.DB}`, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let resources = [
  {
    type: "video",
    name: "Gasolineras",
    url: "https://www.youtube.com/watch?v=-YARoSwQd-g"
  },
  {
    type: "audio",
    name: "Melendi",
    url: "https://www.youtube.com/watch?v=-YARoSwQd-g"
  },
  {
    type: "book",
    name: "Don't make me think",
    url: "https://www.youtube.com/watch?v=-YARoSwQd-g"
  }
]

Resource.deleteMany()
.then(() => {
  return Resource.create(resources)
})
.then(resourcesCreated => {
  console.log(`${resourcesCreated.length} resources created with the following id:`);
  console.log(resourcesCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})