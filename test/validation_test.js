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
}); 