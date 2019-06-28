const User = require('../src/user');
const assert = require('assert');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
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
  
  it('a model instance can update', done => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('a model class can update', done => {
    assertName(
      User.updateOne({ name: 'Joe'}, { name: 'Alex'}),
      done
    );
  });
  
  it('a model class can update one record', done => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Alex'}),
      done
    );
  });
  
  it('a model class can find a record with and Id and update', done => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex'}),
      done
    );
  });

  // x mean not excetution
  xit('a user can have their postcount incremented by 1', done => {
    User.updateOne({ name: 'Joe'}, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe'}))
      .then(user => {
        assert(user.postCount === 1);
        done();
      });
  });
});