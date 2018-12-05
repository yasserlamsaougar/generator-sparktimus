const _ = require('lodash')
const writerConf = require('./writers_conf')

function createPaths(generator, ...paths) {
    return paths.map(e => generator.templatePath(e))
}

function copyTemplates(generator, writerId) {
    const fs = generator.fs
    const conf = generator.answers
    const writerTemplates = writerConf[writerId](conf)
    _.forEach(writerTemplates, (templates, dest) => {
        fs.copyTpl(createPaths(generator, ...templates),
            generator.destinationPath(dest), generator.answers)
    })
}

const globalWriter = {
    priority: 0,
    id: 'global',
    run(generator) {
        copyTemplates(generator, this.id)
    }
}

const javaWriter = {
    priority: 1,
    id: 'java',
    run(generator) {
        if (generator.answers.java.useJava) {
            copyTemplates(generator, this.id)
        }

    }
}
const scalaWriter = {
    priority: 1,
    id: 'scala',
    run(generator) {
        if (generator.answers.scala.useScala) {
            copyTemplates(generator, this.id)
        }
    }
}

const sparkWriter = {
    priority: 1,
    id: 'spark',
    run(generator) {
        if (!generator.answers.spark.useSparktimus) {
            copyTemplates(generator, this.id)
        }
    }
}

const cucumberWriter = {
    priority: 2,
    id: 'cucumber',
    run(generator) {
        if (generator.answers.hc.useHc) {
            copyTemplates(generator, this.id)
        }
    }
}

const sparktimusWriter = {
    priority: 1,
    id: 'sparktimus',
    run(generator) {
        if (generator.answers.spark.useSparktimus) {
            copyTemplates(generator, this.id)
        }
    }
}

module.exports = _.sortBy([
    globalWriter,
    scalaWriter,
    javaWriter,
    cucumberWriter,
    sparktimusWriter,
    sparkWriter
], 'priority')