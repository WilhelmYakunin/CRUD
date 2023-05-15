import createError from './createError';
import state from '../model';

const onDelete = (req: any, res: any) => {
  let userData: string = '';

  req
    .on('data', (chunk: ArrayBuffer) => {
      userData += chunk;
    })
    .on('end', () => {
      const indexofLastSlash = req.url.lastIndexOf('/');
      const id = req.url.slice(indexofLastSlash + 1);

      if (isNaN(Number(id))) {
        res.statusCode = 400;
        const err = createError(
          400,
          `the id ${id} is invalid or url is incorect`
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

      const IDindex = state.users.findIndex((user) => user.id === id);
      const pathIndex = state.paths.findIndex(
        (path) => path === 'api/users/' + id
      );
      state.users.splice(IDindex, 1);
      state.paths.splice(pathIndex, 1);
      res.statusCode = 204;
      res.write(`the user with id: ${id} deleted`);
      res.end();
    });
};

export default onDelete;
