import supertest from 'supertest';
import app from '../server';

// GET /

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const result = await supertest(app).get('/');
    expect(result.status).toEqual(200);
    expect(result.text).toEqual('{"message":"Hello World!"}');
  });
});
