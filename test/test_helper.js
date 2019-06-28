const mongoose = require('mongoose');

// set Promise to global
mongoose.Promise = global.Promise;

// before only excetution one time to all test
before((done) => {
  mongoose.connect('mongodb://localhost/user_test',{ useNewUrlParser: true,  useFindAndModify: false  });
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    })
})

// done is mocha magic which have async to wait
beforeEach((done) => {
  const { users, comments, blogPosts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogPosts.drop(() => {
        done();
      })
    })
  })
})