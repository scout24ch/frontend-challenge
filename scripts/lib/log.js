const chalk = require('chalk')

class Log {
  constructor () {
    this.maxNameLength = 0
    this.dict = {}
    this.register('success', chalk.green, console.log)
    this.register('failure', chalk.red, console.error)
    this.register('warning', chalk.yellow, console.info)
    this.register('info', chalk.blue, console.info)
  }
  pad (subject, length) {
    return " ".repeat(length).slice(subject.toString().length) + subject
  }
  register (name, chalkFn, consoleFn = 'info') {
    name = name.toString().trim()
    if (!name || this.hasOwnProperty[name]) {
      throw new Error(name + ' can not being defined')
    }
    const label = `[${name}]`
    this.maxLabelLength = Math.max(this.maxLabelLength, label.length)
    this[name] = (...args) => consoleFn.apply(console, [
      chalkFn.call(chalk,
        this.pad(label, this.maxLabelLength)
      ),
      ...args
    ])
    return this[name]
  }
}

module.exports = new Log()
