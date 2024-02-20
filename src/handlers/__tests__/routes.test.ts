import * as user from '../user';

// test for create new user
describe('user handler', () => {
  it('should create a new user', async () => {
    const req = {
      body: {
        username: 'testuser',
        password: 'testpassword',
      },
    };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res);
  });
});
