'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import { Request, Response } from "express";

// import useragent from "useragent";

// Dependecies
// import express = require("express");
import express from 'express';
import { AddressInfo } from "net";
const bodyParser = require("body-parser");
const app = express();
const session = require('express-session');
const useragent = require('express-useragent');
const log = require('./log');
const spotifuncs = require('./spotifuncs');
const spotifylogin = require("./spotifylogin");
const { getTracksOfArtist } = require("./spotifuncs");
const utils = require("./utils");

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
app.get('/', (req: Request, res: Response)=> {
  if (req.session && !req.session.userid) {    
    res.sendFile(`${__dirname}/views/login.html`);
  } else {
    if (req.useragent && req.useragent.isMobile) {
      res.sendFile(`${__dirname}/views/index-mobile.html`);
    } else {
      res.sendFile(`${__dirname}/views/index.html`);
    }
  }
});

app.get('/following', (req: Request, res: Response) => {
  if (req.session &&  !req.session.userid) {
    res.send({
      status: 'error',
      message: 'no session'
    });
    return;
  } else {
    spotifuncs.getFollowing(req.session && req.session.userid)
    .then((result: any)=>{
      res.send(result);
    });
  }
});

// Start the server
var listener = app.listen(process.env.PORT, () => {
  log.info(`App is listening on port ${(listener.address() as AddressInfo).port}`);
});


if (process.env.NODE_ENV !== 'production') {
  require('./temp')();
}

// unit testing
//https://mochajs.org/

//Ctrl+Alt+D Ctrl+Alt+D to create documentation template

//TODO rename session userid to userId
//TODO separate all routing into a dedicated directory

//TODO addTracksToPlaylist should handle doing chunks by itself

//TODO transfer to typescript

//TODO move result handling to APIError class
//TODO filter out singles reappearing in albums

//TODO use try-again instead of limiting program to synchronous
//TODO one track can be added twice when two followed artist are on it

//TODO implement paging for getting albums
//TODO implement paging for getting tracks for albums (super-edge case)
//TODO pack the request stuff into a function? (mby a nested one?)

//TODO add option to include appears on (and an option: only songs with the artist, because otherwise whole album will be included even if the artist contributed to just one song)
