import * as http from 'http';
import app from '../src/app';
import request from 'supertest';

describe('Sever starts properly', () => {
  const server = http.createServer(app);

  test('get /api/users returns []', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('[]');
  });

  test('Requests to non-existing endpoints should be handled with 404_err and corresponding human-friendly message)', async () => {
    const res = await request(server).get('/asdf');
    const properResult = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: 'page /asdf not found',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(properResult, null, 2));
  });
});
