const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_test',{ useNewUrlParser: true });
mongoose.connection
  .once('open', () => console.log('Good to go!'))
  .on('error', (error) => {
    console.warn('Warning', error);
  })

// done is mocha magic which have async to wait
beforeEach((done) => {
  mongoose.connection.collection.users.drop(() => {
    done();
  })
})