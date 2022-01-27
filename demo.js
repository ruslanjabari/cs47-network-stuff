const { _fetch, fetch } = require('./polyfil.js');
fetch.prototype = _fetch.prototype = main.constructor.name;

function main() {
  _fetch('https://google.com');
}

async function main2() {
  const result = fetch('https://google.com');
  // console.log(result);
  // console.log('\nDone! from main2');
}

main();
