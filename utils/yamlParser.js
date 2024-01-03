const yaml = require('js-yaml');
const fs = require('fs');

exports.parseYaml = function (filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.safeLoad(fileContents);
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
};