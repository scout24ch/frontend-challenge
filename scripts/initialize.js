const path = require('path')
const fs = require('fs-extra')
const { config } = require('./lib')

const initialize = async () => {
  console.log(config)
}

initialize()