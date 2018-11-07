const { Server } = require('./constructors')

class WebServer extends Server {
  constructor (port, name, webroot) {
    super(port, name)
  
    // add static
    this.app.use(this.express.static(webroot))

    this.start()
  }
}

module.exports = WebServer