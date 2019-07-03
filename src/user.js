const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  posts: [PostSchema],
  likes: Number,
  blogPosts:[{
    type: Schema.Types.ObjectId,
    ref: 'blogPost'
  }]
});

// make virtual field
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// make middleware for remove all collection association
UserSchema.pre('remove', function(next) {
  // load blogPost collection withour require the file
  const Blogpost = mongoose.model('blogPost')
  // go to blogpost -> id, if id is in then remove
  Blogpost.remove({ _id: { $in: this.blogPosts } })
    .then(() => next());
});

const User = mongoose.model('user', UserSchema);

module.exports = User;