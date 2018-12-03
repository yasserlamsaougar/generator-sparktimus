const _ = require('lodash')

function createPaths(generator, ...paths) {
    return paths.map(e => generator.templatePath(e))
}
const globalWriter = {
    priority: 0,
    run(generator) {
        const fs = generator.fs
        const projectName = generator.options.appname
        const sourceRoot = generator.sourceRoot()
        fs.copyTpl(createPaths(generator, 'build.gradle', 'gradle.properties', 'jenkinsfile', 'settings.gradle'),
            generator.destinationPath(projectName), generator.answers)
    }
}

const javaWriter = {
    priority: 1,
    run(generator) {
        if (generator.answers.java.useJava) {
            const fs = generator.fs
            const projectName = generator.options.appname
            const root = 'src/test/resources/features'
        }

    }
}
const scalaWriter = {
    priority: 1,
    run(generator) {
        if (generator.answers.scala.useScala) {
            const fs = generator.fs
            const projectName = generator.options.appname
            const root = 'src/test/resources/features'
        }
    }
}

const sparkWriter = {
    priority: 1,
    run(generator) {
        if (!generator.answers.spark.useSparktimus) {
            const fs = generator.fs
            const projectName = generator.options.appname
            const root = 'src/test/resources/features'
        }
    }
}

const cucumberWriter = {
    priority: 2,
    run(generator) {
        if (generator.answers.hc.useHc) {
            const root = 'src/test/resources/features'
            const fs = generator.fs
            const projectName = generator.options.appname
            fs.copyTpl(createPaths(generator, 'nominal.feature'),
                generator.destinationPath(projectName, root), generator.answers)
            fs.copyTpl(createPaths(generator, 'env.properties'),
                generator.destinationPath(projectName, root), generator.answers)
        }
    }
}

const sparktimusWriter = {
    priority: 1,
    run(generator) {
        if (generator.answers.spark.useSparktimus) {
            const fs = generator.fs
            const projectName = generator.options.appname
            const root = 'src/test/resources/features'
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