const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    // validate sync return syncronous so no need callback
    const validateResult = user.validateSync();
    // using descructive or mean validate.errors.name.message
    const { message } = validateResult.errors.name;

    assert(message === 'Name is required.');
  });

  it('requires a  user\'s name longer than 2 characters', () => {
    const user = new User({ name: 'Al' });
    const validateResult = user.validateSync();
    const { message } = validateResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  })
}); 