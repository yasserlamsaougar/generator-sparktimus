const _ = require('lodash')
const theme = require('../chalk_themes/chalk_theme')

const versionRegex = /(\+)|((\d+\.)+\d+(-SNAPSHOT)?)/
const versionValidator = {
    id: 'version',
    validate(answer) {
        return versionRegex.test(answer) || theme.error('Please input a correct version (Example: 1.2.3 or 1.2.3-SNAPSHOT)')
    } 
}
module.exports = _.reduce([
    versionValidator
], (acc, value, key) => {
    acc[value.id] = value.validate
    return acc
}, {})