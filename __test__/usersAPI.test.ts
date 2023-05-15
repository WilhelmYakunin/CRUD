import * as http from 'http';
import app from '../src/app';
import request from 'supertest';

describe('simple crud api server', () => {
  const server = http.createServer(app);

  // POST api/users is used to create record about new user and store it in database
  test('POST api/users is used to create record about new user and store it in database', async () => {
    const res = await request(server)
      .post('/api/users')
      .send('username=test&age=20&hobbies=test,test');
    const user =
      '{"id":"0","username":"test","age":20,"hobbies":["test,test"]}';
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe(user);
  });

  test('Server should answer with status code 404 if the post url is not /api/users', async () => {
    const res = await request(server)
      .post('/api/rss')
      .send('username=test&age=20&hobbies=test,test');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: 'unknown url adress',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 400 if if user already exists', async () => {
    const res = await request(server)
      .post('/api/users')
      .send('username=test&age=20&hobbies=test,test');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 400,
      message: 'user already exist',
    };
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 400 and corresponding message if request body does not contain required fields', async () => {
    const res = await request(server)
      .post('/api/users')
      .send('username=test&hobbies=test,test');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 400,
      message: 'input does not contain all required fields',
    };
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  //GET api/users/${userId}
  test('Server should answer with status code 200 and and record with id === userId if it exists', async () => {
    const res = await request(server).get('/api/users/0');
    const user = {
      id: '0',
      username: 'test',
      age: 20,
      hobbies: ['test,test'],
    };
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const res = await request(server).get('/api/users/2typ');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 400,
      message: 'unknown type of the id 2typ or url is incorect',
    };
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 404 and corresponding message if record with id === userId does not exist', async () => {
    const res = await request(server).get('/api/users/23');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: 'user with the id 23 does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  // PUT api/users/{userId} is used to update existing user
  test('Server should answer with status code 200 and updated record', async () => {
    const reso = await request(server)
      .post('/api/users')
      .send('username=test&age=40&hobbies=test,test');

    const res = await request(server)
      .put('/api/users/1')
      .send('username=test&age=450&hobbies=test,test');
    const user = '{"username":"test","age":450,"hobbies":["test,test"]}';
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(user);
  });

  test('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const res = await request(server).put('/api/users/2typ');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 400,
      message: 'unknown type of the id 2typ or url is incorect',
    };
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 404 and corresponding message if record with id === userId does not', async () => {
    const res = await request(server).put('/api/users/23');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: 'user with the id 23 does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  // DELETE api/users/${userId} is used to delete existing user from database

  test('Server should answer with status code 204 if the record is found and deleted', async () => {
    const res = await request(server).delete('/api/users/1');
    expect(res.statusCode).toBe(204);
  });

  test('Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)', async () => {
    const res = await request(server).put('/api/users/2typ');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 400,
      message: 'unknown type of the id 2typ or url is incorect',
    };
    expect(res.statusCode).toBe(400);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  test('Server should answer with status code 404 and corresponding message if record with id === userId does not', async () => {
    const res = await request(server).delete('/api/users/23');
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: 'user with the id 23 does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });
});
