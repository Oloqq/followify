'use strict';

const clientId     = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const callback     = process.env.CALLBACK;
var scope = '';

const querystring = require('querystring');
const { Base64 } = require('js-base64');
const urllib = require('urllib');
const db = require('./database');

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

			urllib.request('https://api.spotify.com/v1/me', {
				method: 'GET',
				headers: {
					'Authorization': 'Bearer ' + data.access_token
				}
			})
			.then((result)=>{
				let profile = JSON.parse(result.data.toString());
				db.putUser(profile.id, authData.access_token, getExpiry(authData.expires_in), authData.refresh_token);
				res.redirect('/');

				function getExpiry(expiresIn) {
					let expiry = new Date();
					expiry.setSeconds(expiry.getSeconds() + expiresIn);
					return expiry;
				}
			});
		})
		.catch(err=>{
			console.log(err);
		});
	});
}

/*
{
  access_token: 'BQDQ9GQ6s1gPvN6UffCJuPV0c4pGyZ0i92Xn59oLojpWHZdKgaJnKy0bxh2RM_uQA_eJCyK_qQbt-Ln9Sf3ztbXYBKrbraiPP9QG65KnBcf_jcAz7priPt2znjfeHEERYhYHy3uP6nW0Aq2pd1V-crtqWKNVtWOHayCfIcbFLft0AfG71MsgocH0aygxRYA-dfXbc1TddfS_sup7g0YfNA',
  token_type: 'Bearer',
  expires_in: 3600,
  refresh_token: 'AQBUSveN0OIIbPYqOYJsqcVhSMpcoWs2tDkkmRb_LPCK4yuDMa6KxTZFniN3bd7D3Imf2ApjKER0kagobmaQRjQ4IE4IFV49M7gK3ipbS70RuwXJ98BrPuQcwPw-I23szVU',
  scope: 'user-follow-read playlist-modify-private playlist-modify-public'
}
*/