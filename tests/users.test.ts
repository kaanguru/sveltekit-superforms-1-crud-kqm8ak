import { expect, it, describe } from 'vitest';
import { createUser, users } from '../src/lib/users';

describe('users', () => {

  it('createUser creates a user object', () => {
    const user = createUser('John', 'john@test.com');

    expect(user).toEqual({
      id: expect.stringMatching(/^[a-z0-9]{8}$/),
      name: 'John', 
      email: 'john@test.com'
    });
  });

  it('users is an array', () => {
    expect(Array.isArray(users)).toBe(true);
  });
  
  it('users contains valid user objects', () => {
    users.forEach(user => {
      expect(user).toMatchObject({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String)  
      });
    });
  });

});
