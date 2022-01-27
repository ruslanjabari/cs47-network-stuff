// const https = require('https');

const Fastify = require('fastify');
const cluster = require('cluster');

// var fs = require('fs');
const { readFileSync } = require('fs');
// var options = {
//   key: fs.readFileSync('key.pem').toString(),
//   cert: fs.readFileSync('cert.pem').toString(),
//   passphrase: fs.readFileSync('seed').toString(),
// };
// https
//   .createServer(options, (req, res) => {
//     console.log(req);
//     res.writeHead(200);
//     res.end('hello back!\n');
//   })
//   .listen(2004, () => console.log('listening on port 2004'));

// https
//   .createServer(options, (req, res) => {
//     res.writeHead(200);
//     setTimeout(() => {
//       res.end('hello back!\n');
//     }, 1000);
//   })
//   .listen(2005);

(async () => {
  if (cluster.isMaster) {
    for (let i = 0; i < 2; i++) {
      cluster.fork();
    }
    const fastify = Fastify({
      https: {
        key: readFileSync('server.key'),
        cert: readFileSync('server.crt'),
      },
      logger: true,
    });
    fastify
      .get('/', async (request, reply) => {
        return 'hello back!';
      })
      .listen(2004, (err, address) => {
        if (err) {
          proces.stdout.write(err);
          process.exit(1);
        }
        // process.stdout.write(`fast server listening on ${address}`);
      });
  } else {
    const fastify = Fastify({
      https: {
        key: readFileSync('server.key'),
        cert: readFileSync('server.crt'),
      },
      logger: true,
    });
    fastify
      .get('/', async () => {
        return new Promise((resolve, _) => {
          setTimeout(
            () => {
              resolve('hello back!');
            },
            cluster.worker.id == 1 ? 1000 : 10000
          );
        });
      })
      .listen(cluster.worker.id == 1 ? 2005 : 2006, (err, address) => {
        if (err) {
          proces.stdout.write(err);
          process.exit(1);
        }
        // process.stdout.write(`slow server listening on ${address}`);
      });
  }
})();
