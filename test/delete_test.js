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

  it('class method remove', done => {
    // remove a records with some given criteria
    User.deleteOne({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findAndRemove', done => {
      User.findOneAndRemove({ name: 'Joe'})
      .then(() => User.findOne({ name: 'Joe' }))
        .then((user) => {
          assert(user === null);
          done();
        });
  });

  it('class method findIdAndRemove', done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
})

