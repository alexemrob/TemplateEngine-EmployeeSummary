const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//create array to push user input
const teamMembers = [];

//initial prompt to add first member as manager (including office#)
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email?"
        },
        {
            type: "input",
            name: "office",
            message: "What is your manager's office number?"
        }
        //uses specific class and constructor function to build manager & send info to teamMembers array
    ]).then(function (answers) {
        const manager = new Manager(answers.name, parseInt(answers.id), answers.email, parseInt(answers.office));
        teamMembers.push(manager);
        addMember();
    });
}


//function to determine which type of member to build next or write to html if no more members using noMoreMembers function
function addMember() {
    inquirer.prompt([
        {
            type: "list",
            name: "type",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]

        }
    ]).then(function (answer) {
        if (answer.type === "Engineer") {
            createEngineer();
        }
        else if (answer.type === "Intern") {
            createIntern();
        }
        else {
            noMoreMembers();
        }

    })
}


//function to add next member as engineer (including github)
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's github?"
        }
        //uses specific class and constructor function to build engineer & send info to teamMembers array
    ]).then(function (answers) {
        const engineer = new Engineer(answers.name, parseInt(answers.id), answers.email, answers.github);
        teamMembers.push(engineer);
        addMember();
    });

}


//function to add next member as intern (including school)
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's id?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is your intern's school?"
        }
        //uses specific class and constructor function to build intern & send info to teamMembers array
    ]).then(function (answers) {
        const intern = new Intern(answers.name, parseInt(answers.id), answers.email, answers.school);
        teamMembers.push(intern);
        addMember();
    });

}


//call initial funtion to start prompts
createManager();


//function that write user input from teamMembers array to html in /output/team.html
function noMoreMembers() {
    fs.writeFile(outputPath, render(teamMembers), function (err) {
        if (err) {
            throw err;
        }
    });
    console.log("Successfully wrote to team.html");
}