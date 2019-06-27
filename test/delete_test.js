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
    console.log('dd')
    done();
  });

  it('class method remove', done => {
    console.log('dd')
    done();
  });

  it('class method findAndRemove', done => {
    console.log('dd')
    done();
  });

  it('class method findIdAndRemove', done => {
    console.log('dd')
    done();
  });
})

