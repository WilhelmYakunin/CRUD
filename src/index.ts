import * as http from 'http';
import app from './app';
import 'dotenv/config';

const { env, pid } = process;
const { port } = env;
const server = http.createServer();

server.listen(port, () => {
  process.stdout.write(
    `Server is running on port: ${port} \npid is: ${pid} \n`
  );

  server.addListener('request', async (req, res) => await app(req, res));
});
