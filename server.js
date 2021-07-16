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
var id = 11182739993;
// spotifuncs.getFollowing(id);
spotifuncs.createFromAll(id);