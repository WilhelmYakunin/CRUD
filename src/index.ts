import * as http from 'http';
import app from './app';
import 'dotenv/config';

const { env, pid } = process;
const { port } = env;
const server = http.createServer(app);

server.listen(port, () => {
  process.stdout.write(
    `Server is running on port: ${port} \npid is: ${pid} \n`
  );
});
