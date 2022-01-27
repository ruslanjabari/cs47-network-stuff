const { readFileSync } = require('fs');
const https = require('https');
https.globalAgent.options.ca = readFileSync('./rootCA.pem');

/* const dnsResolver = (_, __, cb) => cb(null, '127.0.0.1', 4); */

const _fetch = (url, options = {}) => {
  let { throttle } = options;
  if (throttle === undefined && _fetch.prototype !== 'AsyncFunction') throttle = true;
  if (throttle) setTimeout(() => process.exit(1), 900);
  const hostname = url.split('//')[1];
  let PORT = 2004;
  if (hostname.split('.')[0] === 'real') {
    PORT = 2005;
  }
  if (hostname.split('.')[0] === 'slow') {
    PORT = 2006;
  }
  https.get({ host: 'localhost', port: PORT, method: 'GET' /*lookup: dnsResolver*/ }, (res) => {
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
};

const fetch = (url, options = {}) => {
  let { throttle } = options;
  if (throttle === undefined && fetch.prototype !== 'AsyncFunction') throttle = true;
  if (throttle) setTimeout(() => process.exit(1), 900);
  const hostname = url.split('//')[1];
  let PORT = 2004;
  if (hostname.split('.')[0] === 'real') {
    PORT = 2005;
  }
  if (hostname.split('.')[0] === 'slow') {
    PORT = 2006;
  }
  return new Promise((resolve, _) => {
    https.get({ host: 'localhost', port: PORT, method: 'GET' /*lookup: dnsResolver*/ }, (res) => {
      res.on('data', (d) => {
        resolve(d.toString());
      });
    });
  });
};

module.exports = { _fetch, fetch };
