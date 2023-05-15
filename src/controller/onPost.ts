import createError from './createError';
import state from '../model';

const onPost = (req: any, res: any) => {
  if (req.url !== '/api/users') {
    res.statusCode = 404;
    const err = createError(404, 'unknown url adress');
    res.write(JSON.stringify(err, null, 2));
    res.end();
    return;
  }

  let userData: string = '';

  req
    .on('data', (chunk: ArrayBuffer) => {
      userData += chunk;
    })
    .on('end', () => {
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

      const user = state.users.find(
        (user) => user.username === username && user.age === age
      );

      if (user) {
        res.statusCode = 400;
        const err = createError(400, `user already exist`);
        res.write(JSON.stringify(err, null, 2));
        return res.end();
      }

      const getId = () => {
        const id = String(state.usersIDs.count);
        state.usersIDs.count += 1;
        state.usersIDs.ids.push(id);
        return id;
      };

      const newUser: typeof user = {
        id: String(getId()),
        username: username,
        age: age,
        hobbies: Boolean(hobbies) ? hobbies : [],
      };

      state.users.push(newUser);
      state.paths.push('/api/users/' + newUser.id);
      res.statusCode = 201;
      res.write(JSON.stringify(newUser));
      return res.end();
    });
};

export default onPost;
