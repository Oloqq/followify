'use strict';

const urllib = require('urllib');
const db = require('./database');
const log = require('./log');
const { Base64 } = require('js-base64');

const clientId     = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

async function putUser(id, accessToken, expiresIn, refreshToken) {
	let expiry = getExpiry(expiresIn);
	db.putUser(id, accessToken, expiry.toUTCString(), refreshToken);
}

async function refreshToken(user) {
	var result = await urllib.request('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + Base64.encode(clientId + ':' + clientSecret)
		},
		data: {
			grant_type: 'refresh_token',
			refresh_token: user.refresh_token
		},
	})
	var data = JSON.parse(result.data.toString());
	var refresh_token = data.refresh_token || user.refresh_token;
	if (data.refresh_token) {
		log.info('refreshing token generated new refresh token for user ', user.id);
	}
	db.putUser(user.id, data.access_token, getExpiry(data.expires_in), refresh_token);
	return data.access_token;
}

async function getToken(userid) {
	var user = await db.getUser(userid);
	var expiry = new Date(user.expiry);
	var now = new Date();
	// console.log(expiry, now);
	now.setMinutes(now.getMinutes() - 1);
	if (now > expiry) {
		user.access_token = await refreshToken(user);
	}
	return user.access_token;
}

async function getFollowing(userid) {
	var token = await getToken(userid);
	console.log(token);
	return ['ĄĄĄĄĄ'];
}

function getExpiry(expiresIn) {
	let expiry = new Date();
	expiry.setSeconds(expiry.getSeconds() + expiresIn);
	return expiry;
}

module.exports = {
	getFollowing,
	putUser
};