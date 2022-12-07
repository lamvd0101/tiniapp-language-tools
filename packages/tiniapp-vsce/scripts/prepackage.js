const fs = require('fs');
const path = require('path');

const packagePath = path.join(__dirname, '..', 'package.json');
const bkPackagePath = path.join(__dirname, '..', 'package.json.bk');

const DOC_ID = '@tikivn/tiniapp-docs';
const JSAPI_PLUGIN_ID = '@tikivn/tiniapp-jsapi-plugin';

// Backup the package.json file
fs.copyFileSync(packagePath, bkPackagePath);

// Create a new package.json file
const packageStr = fs.readFileSync(packagePath);
const packageJson = JSON.parse(packageStr);

const docsVersion = packageJson.dependencies[DOC_ID];
const jsapiPluginVersion = packageJson.dependencies[JSAPI_PLUGIN_ID];
delete packageJson.dependencies;
packageJson.dependencies = {};
packageJson.dependencies[DOC_ID] = docsVersion;
packageJson.dependencies[JSAPI_PLUGIN_ID] = jsapiPluginVersion;

delete packageJson.devDependencies;
delete packageJson.scripts;
fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));

// Create a new folder for the plugin
const buildPath = path.join(__dirname, '..', 'build');
if (!fs.existsSync(buildPath)) {
  fs.mkdirSync(buildPath);
}
