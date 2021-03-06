const User = require('../src/user');
const assert = require('assert');

describe('Reading users out of the database', () => {
  let joe, alex, maria, zach ;

  beforeEach((done) => {
    alex = new User({ name: 'Alex'});
    joe = new User({ name: 'Joe'});
    maria = new User({ name: 'Maria'});
    zach = new User({ name: 'zach'});

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
      .then(() => done());
  });

  it('finds all user with a name of joe', (done) => {
    User.find({ name: 'Joe' })
      .then((users) => {
        // need to compare as string bec not same type
        assert(users[0]._id.toString() === joe._id.toString());
        done();
      });
  });
  
  it('find a user with a particular id', done => {
    User.findOne({ _id: joe._id })
      .then(user => {
        assert(user.name === 'Joe');
        done();
      });
  });

  it('can skip and limit the result set', done => {
    User.find({})
      // sorting by name in ascending if desc = -1
      .sort({ name: 1})
      .skip(1)
      .limit(2)
      .then(user => {
        assert(user.length === 2);
        assert(user[0].name === 'Joe');
        assert(user[1].name === 'Maria');
        done();
      });
  });
});