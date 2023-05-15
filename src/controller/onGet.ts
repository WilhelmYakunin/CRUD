import * as path from 'path';
import { createReadStream } from 'fs';
import state from '../model';
import { createError } from '../controller';
import { v4 as uuidv4, validate } from 'uuid';

const __dirname = path.dirname(__filename);

const onGet = (url: string, res: any) => {
  const sendError = () => {
    res.statusCode = 404;
    const err = createError(404, `page ${url} not found`);
    res.write(JSON.stringify(err, null, 2));
    res.end();
    return;
  };

  const sendIndex = () => {
    const indexFile = path.join(__dirname, 'index.html');
    const readble = createReadStream(indexFile);
    readble.on('data', (chunk) => {
      res.statusCode = 200;
      res.write(chunk);
    });
    readble.on('end', () => {
      res.end();
      return;
    });
  };

  const getAllusers = () => {
    res.statusCode = 200;
    res.write(JSON.stringify(state.users));
    res.end();
    return;
  };

  const indexofLastSlash = url.lastIndexOf('/');
  const id = url.slice(indexofLastSlash + 1);

  const sendUser = () => {
    if (!validate(id) && url.slice(0, 10) === '/api/users') {
      res.statusCode = 400;
      const err = createError(
        400,
        `unknown type of the id ${id} or url is incorect`
      );
      res.write(JSON.stringify(err, null, 2));
      res.end();
      return;
    }
    const isCorrectPage = () => {
      return state.paths.includes(url);
    };
    if (!isCorrectPage() && url.slice(0, 10) !== '/api/users')
      return sendError();

    const hasUser = state.users.find((user) => user.id === id);
    if (!hasUser) {
      res.statusCode = 404;
      const err = createError(404, `user with the id ${id} does not exist`);
      res.write(JSON.stringify(err, null, 2));
      res.end();
      return;
    }

    const index = state.users.findIndex((user) => user.id === id);
    const user = state.users.splice(index, 1)[0];
    res.write(JSON.stringify(user, null, 2));
    res.end();
    return;
  };

  switch (url) {
    case '/':
      return sendIndex();
    case '/api/users':
      return getAllusers();
    default:
      return sendUser();
  }
};

export default onGet;
