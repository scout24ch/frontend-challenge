const path = require('path')

module.exports = {
  storageFile: path.join(__dirname, 'storage', 'store.json'),
  webroot: path.join(__dirname, '..', '..', 'webroot')
}
