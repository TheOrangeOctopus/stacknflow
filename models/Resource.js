const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const resourceSchema = new Schema({
  type:{
    type: String,
    enum: ["video","audio","music","book", "link","pdf"],
    required: true
  },
  name: String,
  url: String,
});

const Resources = mongoose.model('Resources', resourceSchema);
module.exports = Resources;
