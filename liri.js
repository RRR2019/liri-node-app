//read and set any enviroment variables with the dotenv package.
require("dotenv").config();

//including axios and node-spotify-api packages
const axios = require("axios");
const fs = require("fs");
const Spotify = require("node-spotify-api");

//import keys.js file and storing it in a variable.
const keys = require("./keys.js");
// acces spotify keys
const spotify = new Spotify(keys.spotify);

// takes command line arguments
let input= process.argv;
//separate command line in action and title of song or movie
let action = input[2];
let title = input[3];


//switch function to determine what the program will do with the first argument the user.
switch(action){
    case "spotify-this-song":
        spot(title)
    break;  

    case "movie-this":
        Movies();
    break;

    case "do-what it says":
        Read();
    break;
    
    default:
        console.log("Try again");
    break;    
}

//function Spotify to acces the Spotify API
function spot(song){
    spotify.search({ type: 'track', query: song })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

}





