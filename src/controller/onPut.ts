import createError from './createError';
import state from '../model';
import { v4 as uuidv4, validate } from 'uuid';

const onPut = (req: any, res: any) => {
  let userData: string = '';

  req
    .on('data', (chunk: ArrayBuffer) => {
      userData += chunk;
    })
    .on('end', () => {
      const indexofLastSlash = req.url.lastIndexOf('/');
      const id = req.url.slice(indexofLastSlash + 1);

      if (!validate(id)) {
        res.statusCode = 400;
        const err = createError(
          400,
          `unknown type of the id ${id} or url is incorect`
        );
        res.write(JSON.stringify(err, null, 2));
        res.end();
        return;
      }

      const user = state.users.find((user) => user.id === id);

      if (!user) {
        res.statusCode = 404;
        const err = createError(404, `user with the id ${id} does not exist`);
        res.write(JSON.stringify(err, null, 2));
        res.end();
        return;
      }

      let username: string;
      let age: number;
      let hobbies: string[] = [];

      const reqPairs = userData.split('&');
      const allPropsNames: string[] = [];
      reqPairs.map((pair) => {
        switch (pair.split('=')[0]) {
          case 'username':
            allPropsNames.push('username');
            return (username = pair.split('=')[1]);
          case 'age':
            allPropsNames.push('age');
            return (age = Number(pair.split('=')[1]));
          case 'hobbies':
            allPropsNames.push('hobbies');
            const hobbiesString = pair.split('=')[1];
            if (hobbiesString !== '') {
              hobbiesString.split('%2C').map((hobby) => hobbies.push(hobby));
            }
            return;
          default:
            res.statusCode = 400;
            const err = createError(
              400,
              `unknown input filed ${pair.split('=')[0]} with property ${
                pair.split('=')[1]
              }`
            );
            res.write(JSON.stringify(err, null, 2));
            res.end();
            return;
        }
      });

      const hasAllProps = Boolean(
        allPropsNames.includes('username') &&
          allPropsNames.includes('age') &&
          allPropsNames.includes('hobbies')
      );
      if (!hasAllProps) {
        res.statusCode = 400;
        const err = createError(
          400,
          'input does not contain all required fields'
        );
        res.write(JSON.stringify(err, null, 2));
        return res.end();
      }

      interface newUserInfo {
        username?: string;
        age?: number;
        hobbies?: string[];
      }

      const newUserInfo: newUserInfo = {
        username: username,
        age,
        hobbies: Boolean(hobbies) ? hobbies : [],
      };

      state.users.map((user) => {
        if (user.id === id) {
          Object.assign(user, newUserInfo);
        }
      });
      res.write(JSON.stringify(newUserInfo));
      res.end();
    });
};

export default onPut;
