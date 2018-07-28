require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");
var fs = require("fs");


var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
    screen_name: "kc9gpj",
    count: 20
  };

var command = process.argv[2];
var commandInput = process.argv[3];


	switch(command) {
		case "my-tweets":
			twitter();
			break;
		case "spotify-this-song":
			spotify();
			break;
		case "movie-this":
			movie();
			break;
		case "do-what-it-says":
			what();
			break;
		default:
			console.log("Try Again!");
	}

function twitter(){
client.get('statuses/user_timeline', params, function(error, tweets) {
  if (!error) {
      for (i=0; i < tweets.length; i++){
          var tweetsAll = tweets[i].text;
          console.log(tweetsAll);
      }
  }
});
}

function spotify(){
     
    spotifyKey.search({ type: 'track', query: commandInput, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log("Artist: " + data.tracks.items[0].artists[0].name); 
    console.log("Title: " + data.tracks.items[0].name);
    console.log("Song Link: " + data.tracks.items[0].artists[0].href);
    console.log("Album: " + data.tracks.items[0].album.name);
    });
        }
     
function movie(){
  

    request("http://www.omdbapi.com/?t=" + commandInput +  "&apikey=c2c3dab6", function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).data);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("It released on: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).imdbRating);
            var rotten = JSON.parse(body).Ratings[1];
            console.log("The Rotten Tomatoes rating is: " + JSON.stringify(rotten));
            console.log("It was made in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
          }
        });
}

function what(){

// This block of code will read from the "movies.txt" file.
// It's important to include the "utf8" parameter or the code will provide stream data (garbage)
// The code will store the contents of the reading inside the variable "data"
fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }

  // We will then print the contents of data
  console.log(data);
});
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.
}
