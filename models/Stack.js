const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const stackSchema = new Schema({
  title: String,
  description: String,
  category:{
    type: String,
    enum: ["sport","learning","culture","spare"],
    required: true
  },
  tags:[String],
  timeInHours:{
    type:Number,
    enum:[1,2,4]
  },
  likesCounter: Number,
  createdBy: String,
  //createdBy: [{type: Schema.Types.ObjectId,ref: "User"}],
  status:{
    type:String,
    enum: ["active","pending","delete"],
    default: "pending"
  },
  image: String,
  steps: [{
    title : String,
    instruction: String,
    resource: String,
    resourceName: String,
    timeInMinutes: Number,
    url: String,
    order:Number,
    songName:String,
    songArtist:String,
    docName:String,
    bookName: String,
    bookAuthor: String,
    bookImage: String,
     }],
    hasMusic: Boolean,
    hasBook: Boolean ,
    hasVideo: Boolean,
    hasLink: Boolean,
    hasPdf: Boolean,
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Stack = mongoose.model('Stacks', stackSchema);
module.exports = Stack;