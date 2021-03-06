// Init sqlite db
const fs = require("fs");
const dbFile = ".data/followify.db";

// fs.unlinkSync(dbFile); //temp for testing

const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
const log = require('./log');

function putUser(id, accessToken, expiry, refreshToken) {
	var sql = `INSERT INTO user(id, access_token, expiry, refresh_token) 
		VALUES (?, ?, ?, ?) 
		ON CONFLICT(id) DO UPDATE 
			SET access_token=?2, expiry=?3, refresh_token=?4
			WHERE id=?1`;
	db.run(sql, [id, accessToken, expiry, refreshToken], err => {
		if (err) {
			log.error('Failed to put a user in the database: ', err);
		} else {
			log.info('User data updated/inserted for: ', id);
		}
	});
}

// function print() {
// 	db.all(`SELECT * FROM user`, (err, users)=>{
// 		console.log(users);
// 	})
// }

module.exports = {
	putUser,
};

//IIFEs
(function init() {
	if (!exists) {
		// Enable foreign keys
		db.get('PRAGMA foreign_keys = ON');

		db.serialize(()=>{
			db.run(`
				CREATE TABLE user (
					id varchar(20) NOT NULL PRIMARY KEY,
					access_token TEXT,
					expiry TEXT,
					refresh_token TEXT
				)
			`);
			db.run(`
				CREATE TABLE playlist (
					id VARCHAR(30) NOT NULL PRIMARY KEY,
					name VARCHAR(100) NOT NULL,
					user_id VARCHAR(20) NOT NULL,
					last_update TEXT,
					update_on_follow INT DEFAULT 0,
					max_track_age INT DEFAULT 30,
					FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
					CHECK (max_track_age < 90)
				)
			`);
			db.run(`
				CREATE TABLE artist (
					id varchar(30) NOT NULL PRIMARY KEY,
					name varchar(100)
				)
			`);
			db.run(`
				CREATE TABLE artist_in_playlist (
					artist_id varchar(30) NOT NULL,
					playlist_id varchar(30) NOT NULL,
					FOREIGN KEY (artist_id) REFERENCES artist(id) ON DELETE CASCADE,
					FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE
				)
			`);
		});
	}
})();