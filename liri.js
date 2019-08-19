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


//switch function to determine what the program will do with the first argument the user
switch(action){
    case "spotify-this-song": // Search for a song
        if(title){ //if user inputs a title then call spotify API function
        spot(title) 
        saveSearches(action + " " + title)// save search into the log.txt
    }
        else{ // if user leaves it blank send a Radiohead song as the title
        spot("weird fishes");
        saveSearches(action + " weird fishes") // save search into the log.txt
        }
    break;  

    case "movie-this": // search for a movie
        if(title){
        movies(title); //if user inputs a title then call movie API function
        saveSearches(action + " " + title)// save search into the log.txt
        }
        else{//if user leaves it blank, send "Pulp Fiction as the title
            movies("pulp fiction")
            saveSearches(action + " pulp fiction")// save search into the log.txt
        }
    break;

    case "do-what-it-says": // do whatever the text file says
        readText(); //call function to read the text file
        saveSearches(action); //save the action into log.txt
    break;
    
    default: // if user inputs something different tell them to try again.
        console.log("Try again");
    break;    
}

//function to acces the Spotify API
function spot(song){
    spotify.search({ type: "track", query: song }).then( // search by "track" user input
    function(response) {
        
    let songInfo=`
        -------------   
        Artist: ${response.tracks.items[0].artists[0].name} 
        Song: ${response.tracks.items[0].name} 
        Album: ${response.tracks.items[0].album.name}
        Spotify Link: ${response.tracks.items[0].external_urls.spotify}
        -------------
            `;  // saving song info in a variable 
        
        console.log(songInfo); // print artist name, song, album and the link to spotify
        saveSearches(songInfo); // save song info into the log.txt
  })
  .catch(function(err) {
    console.log(err);
  });
}

// movie function using omdb API
function movies(title){
    //Link with the user selected title or default value.
     let omdbLink = "http://www.omdbapi.com/?t="+ title +"&y=&plot=short&apikey=trilogy" 

    axios.get(omdbLink).then(
  function(response) {
    
    let movieInfo=`
    -------------   
    Title: ${response.data.Title} 
    Release Date: ${response.data.Year} 
    IMBD Rating: ${response.data.imdbRating}
    Country: ${response.data.Country}
    Plot: ${response.data.Plot}
    Actors: ${response.data.Actors}
    -------------
        `; // saving movie info in a variable 

    console.log(movieInfo); // print movie title, year, imdb rating, country of production, plot and actors
    saveSearches(movieInfo); // save movie info to the log.txt
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

function readText(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
        // Reading contents of txt file and making a 2 element array
         var dataArr = data.split(",");
        spot(dataArr[1]); // search for the song in random.txt file
      
      
    });
}
//function to save results into a log.txt
function saveSearches(log){ 
    fs.appendFile("log.txt", log, function(err) { //print out log into log.txt file
        // If an error was experienced log it
        if (err) {
          console.log(err);
        }
      
      });

}





