"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const _ = require('lodash')
const autocomplete = require('inquirer-autocomplete-prompt')
const prompters = require('../prompters/prompters')
const writers = require('../writers/writers')
module.exports = class extends Generator {
  constructor(...args) {
    super(...args)
    this.env.adapter.promptModule.registerPrompt('autocomplete', null)
    this.argument('appname', { type: String, required: true });
  }
  async prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the exceptional ${chalk.red(
          "generator-sparktimus"
        )} generator!`
      )
    );
    const answers = await _.reduce(_.slice(prompters, 1), (acc, prompter, index) => {
      return acc.then((answers) => prompter.run(this));
    }, _.head(prompters).run(this))

  }

  writing() {
    writers.forEach(e => e.run(this))
  }

  install() {
  }
};
