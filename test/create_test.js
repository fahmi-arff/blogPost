const assert = require('assert');
const User = require('../src/user');

describe('Create records', () => {
  it('saves a user', () => {
    // make instance as new class model
    const joe = new User({ name: 'Joe'});
    joe.save();
  });
});