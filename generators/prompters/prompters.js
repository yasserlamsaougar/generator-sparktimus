const _ = require('lodash')
const validators = require('../validators/validators')
const hadoopCucumberVersion = {
    priority: 0,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "hc.hadoopCucumber",
            message: 'Do you want to use hadoop cucumber',
            default: true
        }]))
        if (generator.answers.hc.hadoopCucumber) {
            generator.answers = _.merge(generator.answers, await generator.prompt([{
                type: 'input',
                name: "hc.version",
                message: 'please type the version of hadoop cucumber you will be using',
                default: '+',
                async validate(input) {
                    return validators.version(input)
                }
            }]))
        }
        return generator.answers
    }
}

const sparkPrompter = {
    priority: 0,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "spark.sparktimus",
            message: 'Do you want to use sparktimus',
            default: true
        }]))
        if (generator.answers.spark.sparktimus) {
            generator.answers = _.merge(generator.answers, await generator.prompt([{
                type: 'input',
                name: "spark.version",
                message: 'please type the version of sparktimus you will be using',
                default: '+',
                async validate(input) {
                    return validators.version(input)
                }
            }]))
        }
        else {
            generator.answers = _.merge(generator.answers, await generator.prompt([{
                type: 'input',
                name: "spark.version",
                message: 'please type the version of spark you will be using',
                default: '+',
                async validate(input) {
                    return validators.version(input)
                }
            }]))
        }
        return generator.answers
    }
}

module.exports = _.sortBy([
    hadoopCucumberVersion,
    sparkPrompter
], 'priority')