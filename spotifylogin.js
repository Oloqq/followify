'use strict';

const clientId     = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callback     = process.env.CALLBACK;
var scope = '';

const querystring = require('querystring');
const { Base64 } = require('js-base64');
const urllib = require('urllib');
const db = require('./database');
const log = require('./log');

module.exports = function(app, scopes) {
	for (let s of scopes) {
		scope += s + ' ';
	}

	app.get('/login', (req, res)=>{
		res.redirect('https://accounts.spotify.com/authorize?' + 
			querystring.stringify({
				response_type: 'code',
				client_id: clientId,
				scope: scope,
				redirect_uri: callback,
			}));
	});
	
	app.get('/callback', (req, res)=>{
		let code = req.query.code || null;
		let options = {
			method: 'POST',
			data: {
				code: code,
				redirect_uri: callback,
				grant_type: 'authorization_code'
			},
			headers: {
				'Authorization': 'Basic ' + Base64.encode(clientId + ':' + clientSecret)
			}
		}
	
		urllib.request('https://accounts.spotify.com/api/token', options)
		.then((result)=>{
			if (result.res.statusCode != 200) { // != success
				res.writeHeader(200, {'Content-Type': 'text/html'});
				//big brain usage of quotation marks forces number to string conversion
				res.write('' + result.res.statusCode);
				res.write('<br>Failed trading code for token');
				res.write('<br><a href="/">homepage</a>');
				res.end();
				return;
			}

			var authData = JSON.parse(result.data.toString());
			var expiry = getExpiry(authData.expires_in);
			function getExpiry(expiresIn) {
				let expiry = new Date();
				expiry.setSeconds(expiry.getSeconds() + expiresIn);
				return expiry;
			}

			urllib.request('https://api.spotify.com/v1/me', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + authData.access_token
				}
			})
			.then((result)=>{
				let profile = JSON.parse(result.data.toString());
				db.putUser(profile.id, authData.access_token, expiry, authData.refresh_token);
				res.redirect('/');
			})
			.catch(err=>{
				log.error('Failed to get spotify profile: ', err);
			});
		})
		.catch(err=>{
			log.error('Failed to get spotify access token: ', err);
		});
	});
}