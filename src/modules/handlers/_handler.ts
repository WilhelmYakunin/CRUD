import { IncomingMessage, ServerResponse } from 'http';
import { handleCreate } from './handleCreate';
import { handleRead } from './handleRead';
import { handleUpdate } from './handleUpdate';
import { handleDelete } from './handleDelete';
import { handleChange } from './handleChange';
import { pid, port } from '../../index';

export const handler = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (process.send) {
      process.send({ port, pid, method: req.method, url: req.url });
    } else {
      console.log(
        `\x1b[34mServer (pid: \x1b[33m${pid}\x1b[34m): \x1b[0m${req.method}\x1b[32m ->\x1b[0m ${req.url}`
      );
    }
    switch (req.method) {
      case 'GET':
        await handleRead(req.url, res);
        break;
      case 'POST':
        await handleCreate(req, res);
        break;
      case 'PUT':
        await handleUpdate(req, res);
        break;
      case 'DELETE':
        await handleDelete(req.url, res);
        break;
      case 'PATCH':
        await handleChange(req, res);
        break;
      default:
        throw Error();
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
