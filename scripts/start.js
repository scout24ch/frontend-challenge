const chalk = require('chalk')
const { ApiServer, WebServer } = require('./lib/servers')
const { config, log, storage } = require('./lib')

// set ports from env or use defaults
const {
  PORT_WEB = 8080,
  PORT_API = 8081
} = process.env

// make sure, we're exit with code:1 for undhandled rejections
process.on('unhandledRejection', error => {
  log.failure(error.message, '\nDetails:\n', error, '\n\n')
  process.exitCode = 1
})

// start servers
const start = async () => {
  log.register('api', )
  await new ApiServer({
    port: PORT_API,
    log: log.register('api', chalk.cyan, console.info)
  })
  await new WebServer({
    port: PORT_WEB,
    log: log.register('web', chalk.cyan, console.info),
    webroot: config.webroot
  })
}

start()