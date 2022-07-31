const path = require('path');
const fs = require('fs');
const solc = require('solc');
// const fsExtra = require('fs-extra')

const greeterPath = path.resolve(__dirname, 'contracts', 'Greeter.sol');
const source = fs.readFileSync(greeterPath, 'UTF-8');

const input = {
  language: 'Solidity',
  sources: {
      'Greeter.sol': {
          content: source,
      },
  },
  settings: {
      outputSelection: {
          '*': {
              '*': ['*'],
          },
      },
  },
};

// const compilesFile = JSON.parse(solc.compile(JSON.stringify(input)));
// console.log(compilesFile.contracts['Greeter.sol'])
// const buildPath = path.resolve(__dirname, 'build');
// const contractName = 'Greeter';
// console.log('Writing: ', contractName + '.json');
// fsExtra.outputJsonSync(
//     path.resolve(buildPath, contractName + '.json'),
//     compilesFile.contracts['Greeter.sol'][contractName]
// );

module.exports = solc.compile(JSON.stringify(input)).contracts['Greeter.sol'];