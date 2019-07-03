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

  it('user clean up dagnling blogpost on remove', done =>{
    joe.remove()
      .then(() => BlogPost.countDocuments())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
