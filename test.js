const fs = require("fs");
const dbFile = ".data/test.db";
fs.unlinkSync(dbFile); //temp for testing
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
					FOREIGN KEY (playlist_id) REFERENCES playlist(id) ON DELETE CASCADE
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

// const log = require('./log');
let id = 'id1';
let access = 'access2';
let expiry = 'expiry3';
let refresh = 'refresh4';
let arr = [access, id, expiry];
var sql = `INSERT INTO user(id, access_token, expiry, refresh_token) 
	VALUES (?, ?, ?, ?1)`;

db.serialize(()=>{
	db.run(sql, arr);
	db.all(`SElECT * FROM user`, (err, res)=>{
		console.log(res);
	})
});



// // const log = require('simple-node-logger').createSimpleLogger('test.log');
// const log = require('./log');
// log.info('RUN');
// // log.setLevel('info');
// log.log('aaa');
// log.info('subscription to ');

// log.warn('nie zestaj sie', {chuj: 997, jaaa: 'ugabuga'});
// log.error('jest pizda');
// log.trace('trace');
// log.fatal('pizda w chuj');
// log.debug('???')



// let vs = [['aaa', 'fa', 'sex'], ['eee', 'fef', 'sex']];
// let placeholders = values.map((vset) => '(?, ?, ?)').join(',');
// console.log(placeholders);

// function insertMany(table, values) {
// 	let placeholders = values.map(value => {
// 		return `(${('?, '.repeat(value.length-1))}?)`;
// 	}).join(',');
	
// 	let sql = `INSERT INTO ${table} VALUES ${placeholders}`;
// 	database.run(sql, values.flat(), err=>{
// 		console.log(err);
// 	});
// }

// let vs = [['aaa', 'fa', 'sex', 8], ['eee', 'fef', 'sex', 12]];
// insertMany(null, 'sample (id, smth, th)', vs);

// console.log("string".repeat(2));