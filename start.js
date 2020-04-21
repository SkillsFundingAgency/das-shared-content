const path = require('path')
const fs = require('fs')

checkFiles();

function checkFiles () {
  const nodeModulesExists = fs.existsSync(path.join(__dirname, '/node_modules'))
  if (!nodeModulesExists) {
    console.error('ERROR: node_modules folder missing. Try running `npm install`')
    process.exit(0)
  }
}

