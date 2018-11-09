const path = require('path')
const Store = require('data-store')

class Storage extends Store {
  constructor (name) {
    super({
      name,
      path: path.join(__dirname, `${name}.json`),
      debounce: 10
    })
  }
}

module.exports = Storage