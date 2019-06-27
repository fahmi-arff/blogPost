const User = require('../src/user');
const assert = require('assert');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe'});
    joe.save()
      .then(() => done());
  });

  it('instance type using set n save', () => {

  });

});