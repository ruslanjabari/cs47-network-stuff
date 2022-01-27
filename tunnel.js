const Tunnel = require('node-tunnel');

const initate_tunnel = async (port, host) => {
  const PORT = port || 443;
  const HOST = host || 'https://example.com';
  const regular_tunnel = new Tunnel();
  regular_tunnel.use((req, _, head, next) => {
    req.url = 'https://localhost:2004';
    next();
  });
  regular_tunnel.listen(443);
  process.stdout.write(`\n\ntunnel up on ${regular_tunnel}:${PORT}\n\n`);
};

module.exports = { initate_tunnel };
