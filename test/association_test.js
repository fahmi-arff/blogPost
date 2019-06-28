const mongoose = require('mongoose');
const User = require('../src/user');
const Comment  = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogpost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogpost = new BlogPost({ title: 'Mongod', content: 'content mongod'});
    comment = new Comment({ content: 'Great post'});

    // embedding the document
    joe.blogPosts.push(blogpost);
    blogpost.comments.push(comment);
    // association comment to joe
    comment.user = joe;

    Promise.all([
      joe.save(),
      blogpost.save(),
      comment.save()
    ])
      .then(() => done());
  });

  // it.only to make test just this line
  it.only('save a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .then(user => {
        console.log(user);
        done();
      });
  });
});