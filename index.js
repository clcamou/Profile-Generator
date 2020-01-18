//nodes and packages to install 
const fs = require("fs");

const inquirer = require("inquirer");

const axios = require("axios");

const electron = require("electron-html-to");

let generateHTML = require("./generateHTML.js");

//convert the profile into a PDF
let conversion = electron({
    convertPath: electron.converters.PDF
});
    console.log();

//question objects to find the username and favorite color of the user
function promptUser(){
    return inquirer.prompt([
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
        }
    ])
}

//function to call the prompt and use axios 
promptUser().then(function (data) {
        username = data.username;
        console.log("Username: " + username);
        colors = data.colors;
        console.log("Color: " + colors);

            const queryURL = "https://api.github.com/users/" + username;
            console.log(queryURL);

            const queryURLStarrred = `https://api.github.com/users/${username}/starred`;


            axios.get(queryURL).then(function(response){
                axios.get(queryURLStarrred).then(function(responseStarred) {
                    response.data.starred_url = responseStarred.data.length;
                    console.log(responseStarred.data.length);

                    let newHTML = generateHTML(response.data, colors);
                    writeToFile(newHTML);

                    function writeToFile(data){
                        fs.writeFile('profile.html', data, function(error) {
                            if (error) {
                                return console.log(err);
                            } else console.log("You did it!");
                        });
                    }

                    conversion({ html: newHTML}, function(err, result) {
                        if (err) {
                            return console.log.error(err);
                        } else console.log("Whoo");

                    result.stream.pipe(fs.createWriteStream('./profile.pdf'));
                    conversion.kill();
                });
            });
        });
});