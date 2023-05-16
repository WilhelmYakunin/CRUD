import * as http from 'http';
import app from '../src/app';
import request from 'supertest';

import defaultState from '../src/controller/state';

describe('Sever starts properly', () => {
  const server = http.createServer(app);

  test('Get all records with a GET api/users request (an empty array is expected)', async () => {
    const res = await request(server).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(JSON.stringify(defaultState.users));
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
