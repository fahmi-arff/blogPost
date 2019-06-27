const User = require('../src/user');
const assert = require('assert');

describe('Reading users out of the database', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('finds all user with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // need to compare as string bec not same type
        console.log(users[0]._id)
        console.log(joe._id)
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      })
  });
});