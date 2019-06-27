const User = require('../src/user');
const assert = require('assert');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  // Make reusable assertion
  function assertName(operation, done){
    operation
      // user find return array
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set n save', done => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
      
  });

});