const SpotifyWebApi = require("spotify-web-api-node");


// Spotify setup

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(data => {
    console.log("Success geting token from spotify")
      spotifyApi.setAccessToken(data.body["access_token"]);
  })
  .catch(error => {
      console.log("Something went wrong when retrieving an access token", error);
  });


  module.exports = spotifyApi;

