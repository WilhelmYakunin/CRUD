import { onGet, onPost, onPut, onDelete, createError } from './controller';
import defaultState from './controller/state';

const app = (req: any, res: any) => {
  const { env, pid } = process;
  const { port } = env;

  if (process.send) {
    req.headers = { ...req.headers, host: 'localhost:4040' };
  } else {
    console.log(`pid: ${pid}: ${req.method} ${req.url}`);
  }
  const { method, url } = req;

  switch (method) {
    case 'GET':
      onGet(url, res);
      break;
    case 'POST':
      onPost(req, res);
      break;
    case 'PUT':
      onPut(req, res);
      break;
    case 'DELETE':
      onDelete(req, res);
      break;
    default:
      res.statusCode = 500;
      const err = createError(
        500,
        `somthing went wrong on server side method: ${method} url: ${url}`
      );
      res.write(JSON.stringify(err, null, 2));
      return res.end();
  }
};

export default app;
