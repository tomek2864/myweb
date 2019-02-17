const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  ytLinks: {
    type: Object
  },
  photoLinks: {
    type: Object
  },
  text: {
    type: Object,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  tags: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Article = mongoose.model("article", ArticleSchema);
