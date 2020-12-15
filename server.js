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

log.info('Booting up... ', new Date());

// App config
app.use(express.static("public"));
app.use(useragent.express());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'skrrt',
  saveUninitialized: true,
  resave: true,
}));
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

// Setup routing for spotify login
const scopes = ['user-follow-read', 'playlist-modify-public',
 'playlist-modify-private'];
require('./spotifylogin')(app, scopes);

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
    res.send(spotifuncs.getFollowing(req.session.userid));
  }
});

// Start the server
var listener = app.listen(process.env.PORT, () => {
  log.info(`App is listening on port ${listener.address().port}`);
});