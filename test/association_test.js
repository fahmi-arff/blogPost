const mongoose = require('mongoose');
const User = require('../src/user');
const Comment  = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Association', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'Mongod', content: 'content mongod'});
    comment = new Comment({ content: 'Great post'});

    // embedding the document
    joe.blogPost.push(blogPost);
    blogPost.comment.push(comment);
    // association comment to joe
    comment.user = joe;

    Promise.all([
      joe.save(),
      blogPost.save(),
      comment.save()
    ])
      .then(() => done());
  });
});