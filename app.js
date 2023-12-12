const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config()

var LastFmNode = require('lastfm').LastFmNode;

var lastfm = new LastFmNode({
    api_key: process.env.api_key,
    secret: process.env.secret
  });

  var trackStream = lastfm.stream(process.env.last_username);

  var last_play = '';

  trackStream.on('nowPlaying', function(track) {
    console.log('Now playing: ' + track.name);
    if (last_play != track.name) {
        last_play = track.name;
        //add song to DB
    }
  });
  
  trackStream.on('error', function(error) {
    console.log('Error: '  + error.message);
  });

  trackStream.start();

app.get('/', (req, res) => {
  res.send('Last Played: ' + last_play);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});