//read and set any enviroment variables with the dotenv package.
require("dotenv").config();

//including axios and node-spotify-api packages
let axios = require("axios");
let fs = require("fs");
let Spotify = require("node-spotify-api");

//import keys.js file and storing it in a variable.
let keys = require("./keys.js");

