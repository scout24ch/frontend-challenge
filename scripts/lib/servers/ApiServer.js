const { Server } = require('./constructors')

class ApiServer extends Server {
  constructor (port, name) {
    super(port, name)

    this.app.use('/', (req, res, next) => res.send(JSON.stringify({ message: 'api works' })))

    this.start()
  }
}

module.exports = ApiServer