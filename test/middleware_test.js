const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogpost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogpost = new BlogPost({ title: 'Mongod', content: 'content mongod'});

    // embedding the document
    joe.blogPosts.push(blogpost);

    Promise.all([
      joe.save(),
      blogpost.save(),
    ])
      .then(() => done());
  });


})
