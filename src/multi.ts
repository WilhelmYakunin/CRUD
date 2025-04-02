import 'dotenv/config';
import app from './app';
import * as http from 'http';
import cluster from 'cluster';
import * as os from 'os';

const { env, pid } = process;
const { port } = env;
const server = http.createServer();

if (cluster.isPrimary) {
  process.stdout.write(`Main server pid: ${pid} \n`);
  const count: number = os.cpus().length;
  for (let i = 0; i < count; i += 1) {
    const worker = cluster.fork({ PORT: Number(port) + i });
    worker.on('message', (msg) => {
      if (!msg.method) {
        process.stdout.write(
          `\x1b[32mServer_${i + 1} (pid: \x1b[33m${
            msg.pid
          }\x1b[32m) started on port \x1b[33m${msg.port}\x1b[0m \n`
        );
      } else if (msg.method) {
        process.send;
        process.stdout.write(
          `\x1b[34mServer (pid: \x1b[33m${msg.pid}\x1b[34m):\x1b[0m ${msg.method}\x1b[32m -> \x1b[0m${msg.url}`
        );
      }
    });
  }
} else {
  let id: number | undefined;
  if (cluster.worker) {
    id = cluster.worker.id;
  }

  server.listen(port, () => {
    if (process.send) process.send({ port, pid });
  });

  server.addListener('request', async (req, res) => await app(req, res));
}
