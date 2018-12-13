const http = require('http')
const express = require('express')
const morgan = require('morgan')
const chalk = require('chalk')
const cors = require('cors')

class Server {
  constructor({ port, log }) {
    this.port = port
    this.log = log
    this.name = this.constructor.name

    // create express application
    const app = express()
    
    // add logging
    app.use(morgan((tokens, req, res) => {
      log(
        chalk.green(tokens.method(req, res)),
        tokens.url(req, res)
      )
      return null
    }))
  
    // set port
    app.set('port', port)
  
    // set some headers
    app.use((req, res, next) => {
      res.setHeader('Connection', 'close')
      res.setHeader('X-Powered-By', this.name)
      next()
    })
    
    // error handler
    app.use((err, req, res, next) => {
      res.locals.message = err.message
      res.locals.error = err
      res.status(err.status || 500)
      res.end(err.message)
    })

    // add cors and preflight to all routes
    app.use('*', cors())

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
      log('up and running.', chalk.cyan(`http://localhost:${port}`))
      if (process.send) {
        process.send('ready')
      }
    })
  
    const shutdown = signal => () => {
      log('shuting down', signal)
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
    this.express = express
  }
  start () {
    this.server.listen(this.port)
  }
}

module.exports = Server