module.exports = {
    global(conf) {
        const submitDir = `${conf.appname}/spark`
        return {
            [conf.appname]: [
                'build.gradle',
                'gradle.properties',
                'jenkinsfile',
                'settings.gradle'
            ],
            [submitDir]: [
                'submit.sh'
            ]
        }
    },
    java(conf) {
        const groupPath = conf.core.group.split('.').join('/')
        const srcRoot = `${conf.appname}/src/main/java/${groupPath}`
        const testRoot = `${conf.appname}/src/test/java/${groupPath}`
        return {
            [srcRoot]: [
                'HelloOptimus.java'
            ],
            [testRoot]: [
                'HelloOptimusTest.java'
            ]
        }
    },
    scala(conf) {
        const groupPath = conf.core.group.split('.').join('/')
        const srcRoot = `${conf.appname}/src/main/scala/${groupPath}`
        const testRoot = `${conf.appname}/src/test/scala/${groupPath}`
        return {
            [srcRoot]: [
                'HelloMain.scala'
            ],
            [testRoot]: [
                'HelloMainTest.scala'
            ]
        }
    },
    cucumber(conf) {
        const testRoot = `${conf.appname}/src/test/resources`
        return {
            [testRoot]: [
                'env-config.properties'
            ],
            [testRoot + '/features']: [
                'nominal.feature'
            ]
        }
    },
    spark(conf) {
        return {
            
        }
    },
    sparktimus(conf) {
        const configDir = `${conf.appname}/config`
        return {
            [configDir]: [
                'env.properties'
            ],
            [configDir + '/workflow']: [
                'output.yaml',
                'input.yaml',
                'mapper.yaml',
                'mapping.json'
            ]
        }
    }
}