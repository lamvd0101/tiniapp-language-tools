// Copy @tikivn/tiniapp-jsapi-plugin into vsce

const path = require('path');
const {readFileSync} = require('fs');
const contents = readFileSync(
  path.resolve(
    __dirname,
    '..',
    'packages/tiniapp-vsce/node_modules/@tikivn/tiniapp-jsapi-plugin/.npmignore',
  ),
  'utf-8',
).split('\n');

console.log(contents);
