//nodes and packages to install 
const fs = require("fs");

const inquirer = require("inquirer");

const axios = require("axios");

const electron = require("electron-html-to");

let generateHTML = require("./generateHTML")

//question objects to find the username and favorite color of the user
const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username",
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["green", "blue", "red", "pink"],
    },
];

let writeFunction = function writeToFile(fileName) {
    fs.writeFile(generateHTML, fileName, function(err) {
        if (err){
            console.log(err)
        } else {
            console.log("You Did It!")
        }
    })
}

//Prompt user for name and favorite color 
let init = function init() {
    inquirer.prompt(questions)
    .then(function(data){
        username = data.username
        console.log("Username: " + username)
        color = data.color
        console.log("Color: " + color)

        //query to get GitHub data
        const queryURL = "https://api.github.com/users/" + username;
        console.log(queryURL)


        try {
        axios.get(queryURL).then(
            (response) => {
            responseData = response;
            writeFunction(generateHTML, "profile.html")
            }).catch(err)
        }
            catch(error) {
                console.log(error)
            }
        })}


init();