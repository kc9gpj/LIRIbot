require("dotenv").config();

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
var request = require("request");

var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var params = {
    screen_name: "kc9gpj"
  };

var command = process.argv[2];
var commandInput = process.argv[3];
var commandInputTwo = process.argv[4];

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
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
    // This will show your last 20 tweets and when they were created at in your terminal/bash window.
  }
});
}

function spotify(){
     
    spotifyKey.search({ type: 'track', query: commandInput }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data); 
    // -Artist
    // -The song's name
    // -A preview link of the song from Spotify
    // -The album that the song is from
    });
        }
     
function movie(){
  

    request("http://www.omdbapi.com/?t=" + commandInput + " " + commandInputTwo + "&apikey=c2c3dab6", function(error, response, body){
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).data);
            console.log("Title: " + JSON.parse(body).Title);
            console.log("It released on: " + JSON.parse(body).Year);
            console.log("The IMDB rating is: " + JSON.parse(body).imdbRating[0]);
            console.log("The Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1]);
            console.log("It was made in: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
          }
        });
}

function what(){
    // Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    // It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
    // Feel free to change the text in that document to test out the feature for other commands.
}
