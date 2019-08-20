# liri-node-app

 LIRI is a _Language_ Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

 iri.js can take in one of the following commands in the arguments followed by a song or movie title.

   * `spotify-this-song` 
   It will search for a song title and gives user artist, album, title and spotify link.
   Ex: spotify-this-song "karma police"

   * `movie-this`
   It will search for a movie title and give Title, Release Date, IMBD Rating, Country, Plot and Actors
   Ex: movie-this "toy story"

   * `do-what-it-says` 
   Reads and does whatever the random.txt says.

   If user leaves title empty it will return a default movie or song.
   All searches and information are stored in a log.txt

   Demo Video: https://drive.google.com/open?id=1iNEJcSPY3SoMtSVl9l52QWsow1b7s6Fe