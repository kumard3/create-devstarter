import cmd from "node-cmd";
import arg from "arg";
import inquirer from "inquirer";
import { createProject } from "./main";
import chalkAnimation from "chalk-animation";

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      "--git": Boolean,
      "--yes": Boolean,
      "--install": Boolean,
      "-g": "--git",
      "-y": "--yes",
      "-i": "--install",
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    skipPrompts: args["--yes"] || false,
    git: args["--git"] || false,
    template: args._[0],
    runInstall: args["--install"] || false,
  };
}
async function promptForMissingOptions(options) {
  const defaultTemplate = "JavaScript";
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: "list",
      name: "template",
      message: "Please choose which project template to use",
      choices: [
        "Nextjs-JavaScript",
        "Nextjs-TypeScript",
        "Nextjs-Tailwind-Typescript",
        "Reactjs-Typescript-Tailwind",
        "NextJs-Tailwind-Js",
        "Reactjs-Tailwind-Js",
        "Nextjs-Particlejs-Starter",
      ],
      default: defaultTemplate,
    });
  }

  if (!options.git && !options.runInstall) {
    questions.push({
      type: "confirm",
      name: "git",
      message: "Initialize a git repository?",
      default: false,
    }),
      questions.push({
        type: "confirm",
        name: "runInstall",
        message: "Do you want to run npm install?",
        default: false,
      });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.runInstall,
  };
}
var questions = [
  {
    type: "input",
    name: "name",
    message: "What's your name?",
    default: "my-app",
  },
];

export async function cli(args) {
  let anim = chalkAnimation.rainbow(`\nDEV-STARTER\n`);
  await new Promise((res) => setTimeout(res, 1500));
  anim.stop();
  console.log("Welcome to Dev Starter.");
  async function folder() {
    await inquirer.prompt(questions).then((answers) => {
      async function test() {
        let targetDirectory = await answers["name"];
        let options = parseArgumentsIntoOptions(args);
        options = await promptForMissingOptions(options);
        await createProject(options, targetDirectory);
      }
       test();
    });
  }
 await folder();
  let anim2 = chalkAnimation.neon(
    "\n You have succesfully installed the  template. \n"
  );
  await new Promise((res) => setTimeout(res, 3500));
  anim2.stop();
}
