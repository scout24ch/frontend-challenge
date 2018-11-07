const { ApiServer, WebServer } = require('./lib/servers')
const { config, log } = require('./lib')

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
  await new WebServer(PORT_WEB, 'WEB', config.webroot)
  await new ApiServer(PORT_API, 'API')
}

start()