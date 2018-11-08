const { Server } = require('./constructors')

class ApiServer extends Server {
  constructor (config) {
    super(config)

    this.app.use('/', (req, res, next) => res.end(JSON.stringify({ message: 'API works' })))

    this.start()
  }
}

module.exports = ApiServer