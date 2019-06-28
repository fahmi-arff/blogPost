const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostScheme = new Schema({
  title: String
});

module.exports = PostScheme;