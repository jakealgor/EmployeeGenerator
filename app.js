const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];

function employeeQuestions() {
    return inquirer.prompt([
    {
    type: "input",
        name: "name",
        message: "What is your name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your work id?"   
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?"
    },
    {
        type: "list",
        name: "role",
        message: "What is your job title?",
        choices: ["Intern", 'Manager', 'Engineer']
    }
    ])

    .then(function(answers){
        if(answers.role == "Intern" ){
            return internQuestions(answers) ;
        } else if (answers.role == "Manager"){
            return managerQuestions(answers);
        } else if (answers.role == "Engineer"){
            return engineerQuestions(answers);
        } 
    })
            .catch(function(err){
                console.log("Not a valid job position.");
                console.log(err);
            })
} 

employeeQuestions()

    function internQuestions(employee_answers) {
        return inquirer.prompt([
            {
            type: "input",
            name: "school",
            message: "What school do you attend?"
            }
])
    .then(function(answers){
        let intern = new Intern (employee_answers.name, employee_answers.id, employee_answers.email, answers.school)
            team.push(intern);
            console.log("Intern added")
            console.log(team);
            addEmployee();
    }) 
}

    function engineerQuestions(employee_answers) {
        return inquirer.prompt([
        {
        type: "input",
            name: "username",
            message: "What is your Github username?"
        }
    ])
    .then(function(answers){
        let engineer = new Engineer (employee_answers.name, employee_answers.id, employee_answers.email, answers.username)
            team.push(engineer);
            console.log("Engineer added")
            console.log(team);
            addEmployee();
    })
}

    function managerQuestions(employee_answers) {
        return inquirer.prompt([
            {
            type: "input",
            name: "officeNumber",
            message: "What is your office number?"
            }
        ])
    .then(function(answers){
        let manager = new Manager (employee_answers.name, employee_answers.id, employee_answers.email, answers.officeNumber)
            team.push(manager);
            console.log("Manager added")
            console.log(team);
            addEmployee();
    })
}
    function addEmployee(){
        inquirer.prompt ([
            {
            type: "confirm",
            name: "addMember",
            message: "Add another employee to the team?"
            }
        ]).then(function(answers){
            if(answers.addMember){
                employeeQuestions();
            } else {
                var html = render(team);
                fs.writeFile(outputPath, html, function (err) {
                    if (err) return console.log(err);
                    console.log("Team HTML Rendered");
                });
            }
        })
    }