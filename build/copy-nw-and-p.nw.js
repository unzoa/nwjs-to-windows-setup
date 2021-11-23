var path = require('path')
var exec = require('child_process').exec
var rootPath = path.resolve(__dirname, '../')
var tmpJson = require(path.resolve(rootPath, './package.json'))

function pack (name) {
  const s = `cd ./releases/${tmpJson.version}/${name} && copy /b nw.exe+package.nw ${tmpJson.name}.exe`
  exec(s)
}

module.exports = pack
