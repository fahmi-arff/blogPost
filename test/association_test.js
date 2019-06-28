const mongoose = require('mongoose');
const assert = require('assert');
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
  it('save a relation between a user and a blogpost', done => {
    User.findOne({ name: 'Joe' })
      .populate('blogPosts')
      .then(user => {
        assert(user.blogPosts[0].title === 'Mongod')
        done();
      });
  });

  it('save a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      .populate({
        // in that user load blogpost
        path: 'blogPosts',
        populate: {
          // inside blogpost fetch the comment property and load up
          path:'comments',
          // what model
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user'
          }
        }
      })
        .then(user => {
          assert(user.name === 'Joe');
          assert(user.blogPosts[0].title === 'Mongod');
          assert(user.blogPosts[0].comments[0].content === 'Great post');
          assert(user.blogPosts[0].comments[0].user.name === 'Joe')
          done();
        })
  })
});