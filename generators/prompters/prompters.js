const _ = require('lodash')
const validators = require('../validators/validators')
const stream = 'stream'
const batch = 'batch'
const natures = [stream, batch]
const components = {
    stream: [
        'kafka',
        'orientdb',
        'hbase'
    ],
    batch: [
        'hbase',
        'hive',
        'orientdb'
    ]
}
const hadoopCucumberVersion = {
    priority: 1,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "hc.useHc",
            message: 'Do you want to use hadoop cucumber',
            default: true
        }]))
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'input',
            name: "hc.version",
            message: 'please type the version of hadoop cucumber you will be using',
            default: '+',
            async when() {
                return generator.answers.hc.useHc
            },
            async validate(input) {
                return validators.version(input)
            }
        }]))
        return generator.answers
    }
}

const javaPrompter = {
    priority: 0,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "java.useJava",
            message: 'Do you want to use java in this project',
            default: true
        }]))
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'input',
            name: "java.version",
            message: 'please type the version of java you will be using',
            default: '1.7',
            async when() {
                return generator.answers.java.useJava
            },
            async validate(input) {
                return validators.version(input)
            }
        }]))

        return generator.answers
    }
}

const scalaPrompter = {
    priority: 0,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "scala.useScala",
            message: 'Do you want to use scala in this project',
            default: true
        }]))
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'input',
            name: "scala.version",
            message: 'please type the version of scala you will be using',
            default: '+',
            async when() {
                return generator.answers.scala.useScala
            },
            async validate(input) {
                return validators.version(input)
            }
        }]))
        return generator.answers
    }
}

const sparkPrompter = {
    priority: 1,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'confirm',
            name: "spark.useSparktimus",
            message: 'Do you want to use sparktimus',
            default: true
        }]))
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'input',
            name: "spark.version",
            message: 'please type the version of sparktimus you will be using',
            default: '+',
            async when() {
                return generator.answers.spark.useSparktimus
            },
            async validate(input) {
                return validators.version(input)
            }
        }]))
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'input',
            name: "spark.version",
            message: 'please type the version of spark you will be using',
            default: '+',
            async when() {
                return !generator.answers.spark.useSparktimus
            },
            async validate(input) {
                return validators.version(input)
            }
        }]))
        return generator.answers
    }
}

const naturePrompter = {
    priority: 2,
    async run(generator) {
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'list',
            name: "core.type",
            choices: natures,
            message: 'What is the nature of this project',
            default: 0
        }]))
        return generator.answers
    }
}

const componentsPrompter = {
    priority: 3,
    async run(generator) {
        const core = generator.answers.core || {}
        generator.answers = _.merge(generator.answers, await generator.prompt([{
            type: 'checkbox',
            name: "core.components",
            choices: components[core.type || stream],
            message: 'Which components are you planning to use',
            default: []
        }]))
        generator.log(generator.answers)
    }
}

module.exports = _.sortBy([
    hadoopCucumberVersion,
    scalaPrompter,
    sparkPrompter,
    javaPrompter,
    naturePrompter,
    componentsPrompter
], 'priority')
