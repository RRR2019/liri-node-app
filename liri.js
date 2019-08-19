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
        spot(title) //call function with spotify API
    break;  

    case "movie-this":
        movies(title); //call function with movie API and axios
    break;

    case "do-what-it-says":
        Read();
    break;
    
    default:
        console.log("Try again");
    break;    
}

//function to acces the Spotify API
function spot(song){
    spotify.search({ type: "track", query: song }).then( // search by "track" user input
    function(response) {
        console.log(`
    -------------   
    Artist: ${response.tracks.items[0].artists[0].name} 
    Song: ${response.tracks.items[0].name} 
    Album: ${response.tracks.items[0].album.name}
    Spotify Link: ${response.tracks.items[0].external_urls.spotify}
    -------------
        `); // print artist name, song, album and the link to spotify

  })
  .catch(function(err) {
    console.log(err);
  });
}

// function 
function movies(title){
    const ombdLink = "http://www.omdbapi.com/?t="+ title +"&y=&plot=short&apikey=trilogy"

    axios.get(ombdLink).then(
  function(response) {
    console.log(`
    -------------   
    Title: ${response.data.Title} 
    Release Date: ${response.data.Year} 
    IMBD Rating: ${response.data.imdbRating}
    Country: ${response.data.Country}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
    -------------
        `); // print movie title, year, imdb rating, country of production, plot and actors
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });
}





