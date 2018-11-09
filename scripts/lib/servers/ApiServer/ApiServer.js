const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const SwaggerExpress = require('swagger-express-mw')
const swaggerUi = require('swagger-ui-express')
const { Server } = require('../constructors')

const swaggerFile = yaml.safeLoad(
  fs.readFileSync(
    path.join(
      __dirname, 'api', 'swagger', 'swagger.yaml'
    ),
    'utf8'
  )
)

class ApiServer extends Server {
  constructor ({ storage, ...config }) {
    super(config)
    this.storage = storage
    SwaggerExpress.create({ appRoot: __dirname }, (err, swaggerExpress) => {
      if (err) { throw err }

      // add all routes from swagger file
      swaggerExpress.register(this.app)

      // add docs route
      this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

      // healthcheck route
      this.app.use('/healthcheck', (req, res, next) => res.json({ message: 'API works' }))

      // start server
      this.start()
    })

  }
}

module.exports = ApiServer