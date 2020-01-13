//nodes and packages to install 
const fs = require("fs");

const inquirer = require("inquirer");

const axios = require("axios");

const electron = require("electron-html-to");

const generateHTML = require("./generateHTML.js");

let results; 

//question objects to find the username and favorite color of the user
const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
    },
    {
        type: "list",
        name: "colors",
        message: "What is your favorite color?",
        choices: ["green", "blue", "red", "pink"],
    },
];

//Prompt user for name and favorite color 
function init() {
    inquirer.prompt(questions)
    .then(function(data){
        username = data.username
        console.log("Username: " + username)
        color = data.color
        console.log("Color: " + color)

        //query to get GitHub data
        let queryURL = "https://api.github.com/users/" + answers.username;
        
        let queryURLRepos = "https://api.github.com/users/" + answers.username + "/repos?per_page=100";

        axios.get(queryURL).then(
            (response) => {

        })
    })
}

init();
//Write the users data to the profile 
function writeToFile(fileName, data) {
 fs.writeFile(fileName, data, 'utf8', function(err) {
     if (err){
         return console.log(err);
     }else {
         console.log("You Did it!")
     }
 })
};


