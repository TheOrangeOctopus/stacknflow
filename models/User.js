const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  banned: {type: Boolean, deafult: false},
  rol: {type: String, enum: ["user", "admin", "mod"], default: "user"},
  stacksCreated: Array,
  //stacksCreated: [{type: Schema.Types.ObjectId,ref: "Stack"}] ,
  stacksSaved: Array,
  //stacksSaved: [{type: Schema.Types.ObjectId,ref: "Stack"}],
  stacksLiked: Array
  //stacksLiked: [{type: Schema.Types.ObjectId,ref: "Stack"}],
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
