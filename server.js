'use strict';

// Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session');
const useragent = require('express-useragent');
const db = require('./database');
const log = require('./log');
const spotifuncs = require('./spotifuncs');
const spotifylogin = require("./spotifylogin");
const { getTracksOfArtist } = require("./spotifuncs");

log.info('Booting up... ', new Date());

// App config
app.use(express.static("public"));
app.use(useragent.express());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
}));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Setup routing for spotify login
const scopes = ['user-follow-read', 'playlist-modify-public',
 'playlist-modify-private'];
require('./spotifylogin').setupLogin(app, scopes);

// Routing
app.get('/', (req, res)=>{
  if (!req.session.userid) {
    res.sendFile(`${__dirname}/views/login.html`);
  } else {
    if (req.useragent.isMobile) {
      res.sendFile(`${__dirname}/views/index-mobile.html`);
    } else {
      res.sendFile(`${__dirname}/views/index.html`);
    }
  }
});

app.get('/following', (req, res) => {
  if (!req.session.userid) {
    res.send({
      status: 'error',
      message: 'no session'
    });
    return;
  } else {
    spotifuncs.getFollowing(req.session.userid)
    .then((result)=>{
      res.send(result);
    });
  }
});

// Start the server
var listener = app.listen(process.env.PORT, () => {
  log.info(`App is listening on port ${listener.address().port}`);
});

// Testing
async function test() {
  

  var id = 11182739993;
  // var artistId = '7jrtLe4eVfWhYWZn5vsopg'; // Hinol Polska Wersja
  // var albumId = '2XhJJYqoUDAnfoOL6YNpLO'; // name: 'Od końca do początku',
  // var artistId =  '14M41VoNuxxvBXaigqZ9D9'; // CatchUp
  var artistId = '4z93wkjfGntA0XFqnv4wj7'; // Pezet
  var albumId = '2Y7UmCMczDhjEkq91V0BVR'; // Pezet - Mem (album)
  var trackId = '3SkC2BjGzfbMd65MQ2snzX' // name: 'Nie potrzeba mi nic więcej',
  var playlistId = '3QHzMmQfvuG3AQWybYyIIS';
  var uris = [`spotify:track:${trackId}`];
  var threshold = new Date(Date.parse('2021-05-25'));
    
  // spotifuncs.getFollowing(id);
  // spotifuncs.createFromAll(id);
  try {
    // var artists = await spotifuncs.getFollowing(id);
    // console.log(artists);

    // var albums = await spotifuncs.getRecentStuffOfArtist(id, artistId, threshold, 'albums,singles');
    // console.log(albums);

    // var tracks = await spotifuncs.getTracksFromAlbum(id, albumId);
    // console.log(tracks);

    // var playlistId = await spotifuncs.createPlaylist(id, 'Test z hinolem');
    // console.log(playlistId);

    // spotifuncs.addTracksToPlaylist(id, playlistId, uris);

    spotifuncs.createFromAll(id);

    // console.log(await spotifuncs.getRecentTracksOfArtists(id, [artistId],
    //    threshold, ['album', 'single']));

  } catch (error) {
    log.error(error);
  }
}
test();

// spotify returns all albums first, only then singles -> make separate calls for singles and albums

//TODO move result handling to APIError class
//TODO filter out singles reappearing in albums

//TODO use try-again instead of limiting program to synchronous
//TODO one track can be added twice when two followed artist are on it

//TODO implement paging for getting albums
//TODO implement paging for getting tracks for albums (super-edge case)
//TODO pack the request stuff into a function? (mby a nested one?)

//TODO add option to include appears on