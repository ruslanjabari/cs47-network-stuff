// const { initate_tunnel } = require('./tunnel.js');
const { spawn } = require('child_process');
/*main */ (async () => {
  const servers = spawn('node', ['server.js']);
  servers.stdout.on('data', (data) => process.stdout.write(data));
  servers.stderr.on('err', (err) => process.stdout.write(err));
  // console.log(process.argv[3], process.argv[2]);
  // await initate_tunnel(process.argv[3], process.argv[2]);
})();
