import 'dotenv/config';
import app from './app';
import * as http from 'http';
import cluster from 'cluster';
import * as os from 'os';

const { env, pid } = process;
const { port } = env;
const server = http.createServer(app);

if (cluster.isPrimary) {
  process.stdout.write(`Main server pid: ${pid} \n`);
  const count: number = os.cpus().length;
  for (let i = 0; i < count; i += 1) {
    cluster.fork();
  }
} else {
  let id: number | undefined;
  if (cluster.worker) {
    id = cluster.worker.id;
  }
  process.stdout.write(`worker ID: ${id}, pid: ${pid}, port: ${port} \n`);
  server.listen(port, () => {
    process.stdout.write(
      `Server is running on port: ${port} \npid is: ${pid} \n`
    );
  });
}
