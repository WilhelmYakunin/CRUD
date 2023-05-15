import * as http from 'http';
import app from '../src/app';
import request from 'supertest';
import { v4 } from 'uuid';

describe('simple crud api server', () => {
  const server = http.createServer(app);

  test('A new object is created by a POST api/users request (a response containing newly created record is expected)', async () => {
    const res = await request(server)
      .post('/api/users')
      .send('username=test&age=20&hobbies=test,test');

    const currenSessionUUID: typeof v4 = JSON.parse(res.text).id;

    const user = {
      id: currenSessionUUID,
      username: 'test',
      age: 20,
      hobbies: ['test,test'],
    };
    expect(res.statusCode).toBe(201);
    expect(res.text).toBe(JSON.stringify(user, null));
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
  test('Server should answer with status code 200 and record with id === userId if it exists', async () => {
    const res = await request(server)
      .get('/api/users')
      .send('username=test&age=20&hobbies=test,test');

    const currenSessionUUID: typeof v4 = JSON.parse(res.text)[0].id;

    const user = [
      {
        id: currenSessionUUID,
        username: 'test',
        age: 20,
        hobbies: ['test,test'],
      },
    ];
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe(JSON.stringify(user));
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
    const res = await request(server).get(
      '/api/users/1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    );
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message:
        'user with the id 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  // PUT api/users/{userId} is used to update existing user
  test('Server should answer with status code 200 and updated record', async () => {
    const resUser = await request(server)
      .post('/api/users')
      .send('username=testPUT&age=20&hobbies=test,test');

    const currenSessionUUID: typeof v4 = JSON.parse(resUser.text).id;

    const res = await request(server)
      .put(`/api/users/${currenSessionUUID}`)
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
    const res = await request(server).put(
      '/api/users/00000000-0000-0000-0000-000000000000'
    );
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message:
        'user with the id 00000000-0000-0000-0000-000000000000 does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });

  // DELETE api/users/${userId} is used to delete existing user from database

  test('Server should answer with status code 204 if the record is found and deleted', async () => {
    const resUser = await request(server)
      .post('/api/users')
      .send('username=testDELETE&age=20&hobbies=test,test');

    let currenSessionUUID: typeof v4 = JSON.parse(resUser.text).id;

    const res = await request(server).delete(`/api/users/${currenSessionUUID}`);
    expect(res.statusCode).toBe(204);

    const resControl = await request(server).get(
      `/api/users/${currenSessionUUID}`
    );

    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message: `user with the id ${currenSessionUUID} does not exist`,
    };

    expect(resControl.statusCode).toBe(404);
    expect(resControl.text).toBe(JSON.stringify(user, null, 2));
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
    const res = await request(server).delete(
      '/api/users/00000000-0000-0000-0000-000000000000'
    );
    const user = {
      codeClass: 'Bad Request',
      statusCode: 404,
      message:
        'user with the id 00000000-0000-0000-0000-000000000000 does not exist',
    };
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(JSON.stringify(user, null, 2));
  });
});
