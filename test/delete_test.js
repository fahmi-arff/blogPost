const User = require('../src/user');
const assert = require('assert');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('model instance remove', done => {
    joe.remove()
      // after remove then find the user with the name 'Joe'
      .then(() => User.findOne({ name: 'Joe'}))
      .then((user) => {
        // assert when user is not found / null
        assert(user === null);
        done();
      })
  });

  // it('class method remove', done => {
  // });

  // it('class method findAndRemove', done => {
  // });

  // it('class method findIdAndRemove', done => {
  // });
})

