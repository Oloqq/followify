'use strict';

// Dependecies
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session');
const db = require('./database');

// App config
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'skrrt',
  saveUninitialized: true,
  resave: true,
}));

// Setup routing for spotify login
const scopes = ['user-follow-read', 'playlist-modify-public',
 'playlist-modify-private'];
require('./spotifylogin')(app, scopes);

// Routing
app.get('/', (req, res)=>{
  res.sendFile(`${__dirname}/views/index.html`);
});

// Start the server
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});