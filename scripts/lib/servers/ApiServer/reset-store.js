const path = require('path')
const fs = require('fs-extra')

const resest = async () => {
  const backupFile = path.join(__dirname, 'api', 'Storage', 'stores', 'recipes-backup.json')
  const storeFile = path.join(__dirname, 'api', 'Storage', 'stores', 'recipes.json')
  const content = await fs.readFile(backupFile, 'utf8')
  await fs.writeFile(storeFile, content)
}

resest()