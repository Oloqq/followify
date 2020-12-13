// Init sqlite db
const { log } = require("console");
const fs = require("fs");
const dbFile = ".data/followify.db";

// fs.unlinkSync(dbFile); //temp for testing

const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

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
					FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CACADE
				)
			`)

			// (function test() {
			// 	//test
			// 	db.run(`
			// 		INSERT INTO user (id) VALUES ('sex'), ('cum');
			// 	`);

			// 	(function insertMany() {
			// 		let values = [['aaa', 'fa', 'sex', 8], ['eee', 'fef', 'sex', 12], ['iii', 'yuy', 'cum', 54]];
			// 		let placeholders = values.map((vset) => '(?, ?, ?, ?)').join(',');
			// 		let sql = "INSERT INTO playlist (id, name, user_id, max_track_age) VALUES " + placeholders;
			// 		db.run(sql, values.flat(), err=>{
			// 			console.log(err);
			// 		});
			// 	})();

			// 	db.all('SELECT * FROM playlist', (err, rows)=>{
			// 		console.log(rows);
			// 	});

			// 	db.run('DELETE FROM user WHERE id="sex"');

			// 	db.all('SELECT * FROM playlist', (err, rows)=>{
			// 		console.log(rows);
			// 	});
			// })();
		});
	}
})();

function putUser(id, accessToken, expiry, refreshToken) {
	db.run(`INSERT INTO user(id, access_token, expiry, refresh_token) 
	VALUES (?, ?, ?, ?)`, [id, accessToken, expiry, refreshToken], 
	err => {
		if (err) {
			console.log(err);
			return false;
		} else {
			return true;
		}
	});
}

module.exports = {
	putUser
}