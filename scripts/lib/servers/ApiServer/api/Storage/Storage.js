const path = require('path')
const Store = require('data-store')

const META_KEY = '__meta'

class Storage extends Store {
  constructor (name) {
    super({
      name,
      path: path.join(__dirname, 'stores', `${name}.json`),
      debounce: 10
    })

    if (!this.has(META_KEY)) {
      this.set(META_KEY, {
        lastId: 0
      })
    }
  }
  add (value) {
    const meta = this.get(META_KEY)
    meta.lastId++

    const id = meta.lastId.toString()
    const now = new Date().toISOString()
    const data = {
      ...value,
      id,
      created: now,
      modified: now
    }

    this.set(id, data)
    this.set(META_KEY, meta)
    return data
  }
  update (id, value) {
    id = id.toString()
    const modified = new Date().toISOString()
    const old = this.get(id)
    const updated = {
      ...old,
      ...value,
      id,
      created: old.created,
      modified
    }
    this.set(id, updated)
    return updated
  }
  list () {
    return Object.keys(this.data)
      .filter(key => key !== META_KEY && this.has(key))
      .map(id => this.get(id))
  }
}

module.exports = Storage