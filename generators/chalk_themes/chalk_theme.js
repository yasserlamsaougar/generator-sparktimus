const chalk = require('chalk')
const trace = chalk.gray
const debug = chalk.white
const info = chalk.blue
const warn = chalk.orange
const error = chalk.red
const severe = chalk.bold.red
const underline = chalk.underline
const italic = chalk.italic

module.exports = {
    trace,
    debug,
    info,
    warn,
    error,
    severe,
    underline,
    italic
}