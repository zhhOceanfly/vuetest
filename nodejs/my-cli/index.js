#!/usr/bin/env node
//console.log("Hello, CLI");

const inquirer = require('./node_modules/inquirer');
inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'What is your name?',
  }
]).then(answers => {
  console.log(`Hi ${answers.name}!`);
});
