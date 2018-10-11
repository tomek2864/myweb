const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
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
