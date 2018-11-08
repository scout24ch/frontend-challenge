const { Server } = require('./constructors')

class WebServer extends Server {
  constructor ({ webroot, ...config }) {
    super(config)
  
    // add static
    this.app.use(this.express.static(webroot))

    this.start()
  }
}

module.exports = WebServer