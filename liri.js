

require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var keys = require('./keys.js');

var spotifyKey = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var params = {
    screen_name: "kc9gpj"
  };

var command = process.argv[2];
var commandInp = process.argv[3];


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
  }
});
}

function spotify(){
     
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(data); 
    });
        }
     


function movie(){

}

function what(){

}
