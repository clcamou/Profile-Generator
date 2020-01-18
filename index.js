//nodes and packages to install 
const fs = require("fs");

const inquirer = require("inquirer");

const axios = require("axios");

const convertFactory = require("electron-html-to");

let generateHTML = require("./generateHTML.js");

let newHTML;
let color;
const colors = {
    green: {
      wrapperBackground: "#E6E1C3",
      headerBackground: "#C1C72C",
      headerColor: "black",
      photoBorderColor: "#black"
    },
    blue: {
      wrapperBackground: "#5F64D3",
      headerBackground: "#26175A",
      headerColor: "white",
      photoBorderColor: "#73448C"
    },
    pink: {
      wrapperBackground: "#879CDF",
      headerBackground: "#FF8374",
      headerColor: "white",
      photoBorderColor: "#FEE24C"
    },
    red: {
      wrapperBackground: "#DE9967",
      headerBackground: "#870603",
      headerColor: "white",
      photoBorderColor: "white"
    }
  };

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
            name: "color",
            message: "What is your favorite color?",
            choices: ["green", "blue", "red", "pink"],
        }
    ])
}

//function to call the prompt and use axios 
promptUser().then(function (data) {
    console.log(data)
        username = data.username;
        console.log("Username: " + username);
        color = data.color;
            console.log("Color: " + color);

            let queryURL = "https://api.github.com/users/" + username;
            console.log(queryURL);

            let queryURLStarrred = `https://api.github.com/users/${username}/starred`;


            axios.get(queryURL)
            .then(function(response){
        
            axios.get(queryURLStarrred).
            then((responseStarred) => { 
                //console.log(responseStarred.data.length);})
                // response.data.starred_url = responseStarred.data.length;
                let newHTML = generateHTML({color, responseStarred, ...response.data});
                writeToFile(newHTML);

            }).catch(error => {
                    console.log(error);
                });

                //write the file into a html file or give an error
                function writeToFile(data){
                    fs.writeFile('profile.html', data, 'utf8', function(err) {
                    if (err) {
                        return console.log(err);
                    } else console.log("You did it!");
                    });
                }

                //convert the profile into a PDF
                var conversion = convertFactory({
                converterPath: convertFactory.converters.PDF
                });

                    conversion({ html: newHTML}, function(err, result) {
                        if (err) {
                            return console.log(err);
                        } 

                    result.stream.pipe(fs.createWriteStream('./profile.pdf'));
                    conversion.kill();
                    });
                })
                .catch(error => {
                    console.log(error);
                });
            });
    