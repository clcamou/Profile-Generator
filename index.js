//nodes
const fs = require("fs");

const inquirer = require("inquirer");

const axios = require("axios");

const convertFactory = require("electron-html-to");

const generate = require("./generateHTML.js");

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

//Write the users data to the profile 
function writeToFile(fileName, data) {
 
};

function init() {}

init();
