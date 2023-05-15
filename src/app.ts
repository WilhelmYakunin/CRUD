import { onGet, onPost, onPut, onDelete, createError } from './controller';

const app = (req: any, res: any) => {
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
