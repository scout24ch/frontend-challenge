const http = require('http')
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')

class Server {
  constructor(port, name) {

    // create express application
    const app = express()
    
    // add a basic logger
    app.use(morgan(`${chalk.cyan(name)} :method :url :status`))
  
    // set port
    app.set('port', port)
  
    // set some headers
    app.use((req, res, next) => {
      res.setHeader('Connection', 'close')
      res.setHeader('X-Powered-By', name)
      next()
    })
    
    // error handler
    app.use((err, req, res, next) => {
      res.locals.message = err.message
      res.locals.error = err
      res.status(err.status || 500)
      res.end(err.message)
    })
  
    // create server
    const server = http.createServer(app)
  
    server.on('error', error => {
      if (error.code === 'EADDRINUSE') {
        console.error(port, 'is already in use')
        process.exit(1)
      }
      throw error
    })
  
    server.on('listening', () => {
      console.log(chalk.cyan(name), `running... http://localhost:${port}`)
      if (process.send) {
        process.send('ready')
      }
    })
  
    const shutdown = signal => () => {
      console.log(chalk.cyan(name), 'shuting down', signal)
      server.close(err => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
        process.exit()
      })
    }
    process.on('SIGINT', shutdown('SIGINT'))
    process.on('SIGTERM', shutdown('SIGTERM'))

    this.app = app
    this.server = server
    this.port = port
    this.name = name
    this.express = express
  }
  start () {
    this.server.listen(this.port)
  }
}

module.exports = Server