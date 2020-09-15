const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser() {
    console.log("Please build your team.")
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your manager's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your manager's email address?"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is your manager's office number?"
        }
    ]);
}
function buildTeam() {
    return inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "Which type of team member would you like to add?",
            choices: ["Engineer", "Intern", "I don't want to add any more team members."]
        }

    ])
        .then(function (answers) {
            if (answers.employeeType == "Engineer") {
                addEngineer()
                if (answers.employeeType == "Intern") {
                    addIntern()
                    if (answers.employeeType == "I don't want to add any more team members.") {
                        noMoreMembers()
                    }
                    buildTeam()
                }
            }
        })
}
function addEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your engineers's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your engineer's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your engineer's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What is your engineer's GitHub name?"
        }
    ]
    );
}


function addIntern() {
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is your intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern's ID number?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your intern's email address?"
        },
        {
            type: "input",
            name: "github",
            message: "What school did your intern attend?"
        }
    ]);
}


function noMoreMembers() {
    //pass employee array to render function
    //render function will return html as string
    //write string to actual html file
}


var employees = []
promptUser()
    .then(function (answers) {
        var manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
        employees.push(manager)
        var engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        employees.push(engineer)
        var intern = new Intern(answers.name, answers.id, answers.email, answers.school)
        employees.push(intern)
        buildTeam()
    })
    .then(function () {
        console.log("Successfully wrote to team.html");
    })
    .catch(function (err) {
        console.log(err);
    })



