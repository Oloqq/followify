'use strict';

const urllib = require('urllib');
const querystring = require('querystring');
const db = require('./database');
const log = require('./log');
const { Base64 } = require('js-base64');
const { putUser } = require('./spotifylogin');
const { query } = require('express');
const randomEmoji = require('./random-emoji');
const utils = require('./utils');

const clientId     = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

function isValidDate(d) {
	return d instanceof Date && !isNaN(d);
}

function authorize()
{
	return 'Basic ' + Base64.encode(clientId + ':' + clientSecret);
}

class APIError extends Error {
	constructor(...params) {
		// Pass remaining arguments (including vendor specific ones) to parent constructor
		super(...params)

		// Maintains proper stack trace for where our error was thrown (only available on V8)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, APIError)
		}

		this.name = 'APIError'
	}
}

async function refreshToken(user) {
	log.info(`Refreshing token for ${user.id}`);
	var result = await urllib.request('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Authorization': authorize()
		},
		data: {
			grant_type: 'refresh_token',
			refresh_token: user.refresh_token
		},
	});
	if (result.res.statusCode != 200) { // didn't succeed
		log.error(`Failed refreshing token for ${user.id}: ${result.res.statusCode}: ${result.res.statusMessage}. ${result.data.toString()}`);
		return undefined;
	}

	var data = JSON.parse(result.data.toString());
	var refresh_token = data.refresh_token || user.refresh_token;
	if (data.refresh_token) {
		log.info('refreshing token generated new refresh token for user ', user.id);
	}
	putUser(user.id, data.access_token, data.expires_in, refresh_token);
	return data.access_token;
}

async function getToken(userId) {
	log.info(`Getting token for ${userId}`);
	var user = await db.getUser(userId);
	var expiry = new Date(user.expiry);
	var now = new Date();
	now.setMinutes(now.getMinutes() - 1); // make sure token won't expire mid operation
	if (!isValidDate(expiry) || now > expiry) {
		user.access_token = await refreshToken(user);
	}
	return user.access_token;
}

async function addTracksToPlaylist(userId, playlistId, tracks, position=0, token=undefined) {
	log.info(`Adding tracks ${tracks} to playlist ${playlistId} at position ${position}`);
	token = token ? token : await getToken(userId);	
	let result = await urllib.request(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		data: {
			'uris': tracks,
			'position': position
		}
	});

	if (result.res.statusCode != 201) { // didn't succeed (201 == created)
		log.error(`Couldn't add to playlist: ${result.res.statusCode}: ${result.res.statusMessage}, `+
		  `${result.data.toString()}` +
			`playlist=${playlistId}, tracks=${tracks}`);
		throw new APIError(result.res.statusCode);
	}
}

async function getTracksFromAlbum(userId, albumId, token=undefined) {
	log.info(`Getting tracks of album ${albumId}`);
	token = token ? token : await getToken(userId);	
	var result = await urllib.request(
		`https://api.spotify.com/v1/albums/${albumId}/tracks?` + querystring.stringify({
			limit: '50'
		}), {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		},
	});
	if (result.res.statusCode != 200) { // didn't succeed
		log.error(`Getting tracks from album failed: ${result.res.statusCode}: ${result.res.statusMessage}. ${result.data.toString()}`);
		throw new APIError(result.res.statusCode);
	}
	var tracks = JSON.parse(result.data.toString()).items;
	return tracks;
}

// stuffType is a comma separated list of [album,single,appears_on,compilation]
async function getRecentStuffOfArtist(userId, artistId, threshold, stuffType,
																			token=undefined) {
	log.info(`Getting recent (${threshold.toISOString()}) stuff (${stuffType}) of ${artistId}`);
	token = token ? token : await getToken(userId);	
	var result = await urllib.request(
		`https://api.spotify.com/v1/artists/${artistId}/albums?` 
		+ querystring.stringify({
			include_groups: stuffType,
			limit: '10',			
		}), {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token
		},
	});
	if (result.res.statusCode != 200) { // didn't succeed
		log.error(`Getting recent albums of an artist failed: `,
							`${result.res.statusCode}: ${result.res.statusMessage} `,
							`${result.data.toString()}`);
		throw new APIError(result.res.statusCode);
	}
	var albums = JSON.parse(result.data.toString()).items;
	albums = albums.filter(album => Date.parse(album.release_date) >= threshold);
	return albums;
}

async function getFollowing(userId, token=undefined) {
	log.info(`Getting following of ${userId}`);
	token = token ? token : await getToken(userId);
	var artists = [];
	var url = 'https://api.spotify.com/v1/me/following?' + querystring.stringify({
		type: 'artist',
		limit: 50
	});
	
	while (true) {
		let result = await urllib.request(url, {
			method: 'GET',
			headers: {
				'Authorization': 'Bearer ' + token
			},
		});

		if (result.res.statusCode != 200) { // didn't succeed
			log.error(`Getting followed artists failed: ${result.res.statusCode}: ${result.res.statusMessage}. ${result.data.toString()}`);
			throw new APIError(result.res.statusCode);
		}

		var data = JSON.parse(result.data.toString()).artists;
		data.items.forEach(artist => {
			artists.push({id: artist.id, name: artist.name});
		});
		
		if (data.next) {
			url = data.next;
		} else {
			break;
		}
	}
	return artists;
}

async function createPlaylist(userId, name, description, token=undefined)
{
	log.info(`Creating playlist. user=${userId}, playlist name=${name}`);

	token = token ? token : await getToken(userId);
	let result = await urllib.request(`https://api.spotify.com/v1/users/${userId}/playlists`, {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token,
			'Content-Type': 'application/json'
		},
		data: {
			"name": name,
			"description": description,
			"public": false
		}
	});

	if (result.res.statusCode != 201) { // didn't succeed
		log.error(`Couldn't create playlist: ${result.res.statusCode}, `+
			`user=${userId}, playlist name=${name}`)
		return;
	}

	var data = JSON.parse(result.data.toString());
	return data.id;
}

async function getRecentTracksOfArtists(userId, artists, threshold, types, token=undefined) {
	// Using asynchronous calls to the API causes 429: Too Many Requests
	log.info(`Getting recent (${threshold}) tracks of artists ${artists} for user ${userId}`);
	token = token ? token : await getToken(userId);
	var tracks = [];
	
	for (let ar = 0; ar < artists.length; ar++) {
		// separate callls for each type, instead of combined, beacause spotify
		// groups by type and only then by date
		for (let type of types) {
			let albums = await getRecentStuffOfArtist(userId, artists[ar].id, threshold, type, token);
			for (let al = 0; al < albums.length; al++) {
				let t = await getTracksFromAlbum(userId, albums[al].id, token);
				tracks = tracks.concat(t);
			}
		}
	}
	return tracks;
}

async function createFromAll(userId, threshold, contentTypes) {
	// Using asynchronous calls to the API causes 429: Too Many Requests
	log.info(`Creating playlist from all artists for user ${userId}, from stuff (${contentTypes}) since ${threshold}`);
	var token = await getToken(userId);
	var tracks = [];
	var uris = [];

	var emoji = randomEmoji();
	var playlistName = `${emoji}New stuff`;
	var playlistDescription = `${emoji}${new Date()}${emoji}`;

	var playlistPromise = createPlaylist(userId, playlistName, playlistDescription, token);
	var artists = await getFollowing(userId, token);
	var tracks = await getRecentTracksOfArtists(userId, artists, threshold, contentTypes, token);
	var playlistId = await Promise.resolve(playlistPromise);

	const chunkLen = 100; // 100 is the max accepted by spotify API
	uris = tracks.map(track => `spotify:track:${track.id}`);
	let chunks = utils.chunkify(uris, chunkLen);
	for (let i = 0; i < chunks.length; i++) {
		await addTracksToPlaylist(userId, playlistId, chunks[i], i*chunkLen, token);
	}
}

module.exports = {
	getFollowing,
	createFromAll,
	getRecentStuffOfArtist,
	getTracksFromAlbum,
	APIError,
	addTracksToPlaylist,
	createPlaylist,
	getRecentTracksOfArtists
};