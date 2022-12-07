const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const bkPackagePath = path.join(__dirname, '..', 'package.json.bk');

fs.unlinkSync(packagePath);
fs.copyFileSync(bkPackagePath, packagePath);
fs.unlinkSync(bkPackagePath);
