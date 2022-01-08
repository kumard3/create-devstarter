import arg from 'arg';
import inquirer from 'inquirer';
import { createProject } from './main';
import chalkAnimation from "chalk-animation";
function parseArgumentsIntoOptions(rawArgs) {
 const args = arg(
   {
     '--git': Boolean,
     '--yes': Boolean,
     '--install': Boolean,
     '-g': '--git',
     '-y': '--yes',
     '-i': '--install',
   },
   {
     argv: rawArgs.slice(2),
   }
 );
 return {
   skipPrompts: args['--yes'] || false,
   git: args['--git'] || false,
   template: args._[0],
   runInstall: args['--install'] || false,
 };
}
async function promptForMissingOptions(options) {
    const defaultTemplate = 'JavaScript';
    if (options.skipPrompts) {
      return {
        ...options,
        template: options.template || defaultTemplate,
      };
    }
   
    const questions = [];
    if (!options.template) {
      questions.push({
        type: 'list',
        name: 'template',
        message: 'Please choose which project template to use',
        choices: ['JavaScript', 'TypeScript','Tailwind-Typescript'],
        default: defaultTemplate,
      });
    }
   
    if (!options.git) {
      questions.push({
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: false,
      });
    }
   
    const answers = await inquirer.prompt(questions);
    return {
      ...options,
      template: options.template || answers.template,
      git: options.git || answers.git,
    };
   }
   
   export async function cli(args) {
    let anim = chalkAnimation.rainbow(`\nDEV-STARTER\n`);
    await new Promise((res) => setTimeout(res, 1500));
    anim.stop();
    console.log("Welcome to Dev Starter.");
    console.log("");
    let options = parseArgumentsIntoOptions(args);
    options = await promptForMissingOptions(options);
    // console.log(options);
    await createProject(options);
    let anim2 = chalkAnimation.neon(
      "\n You have succesfully installed the  template. \n"
    );
    await new Promise((res) => setTimeout(res, 3500));
    anim2.stop();
   }