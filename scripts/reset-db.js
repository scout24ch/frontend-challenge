const path = require('path')
const fs = require('fs-extra')
const { config } = require('./lib')

const resetDb = async () => {
  console.log(config)
}

resetDb()