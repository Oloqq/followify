const fs = require("fs");
const dbFile = ".data/followify.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

const readline = require("readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var none = [];
var dropAll = [
	'DROP TABLE playlist',
	'DROP TABLE user'
];
var truncate = [
	'DELETE FROM user'
]

var orders = none;

function foo(q) {
	if (q.toUpperCase().startsWith('SELECT')) {
		db.all(q, (res, err)=>{
			if (err) console.log(err);
			else {
				console.log(res);
			}
			rl.question('Query: ', foo);
		});
	} else {
		db.run(q, err=>{
			if (err) console.log(err);
			else console.log('completed');
			rl.question('Query: ', foo);
		});
	}
}

db.serialize(()=>{
	for (let i = 0; i < orders.length; i++) {
		db.run(orders[i]);
	}
});

rl.question('Query: ', foo);


rl.on("close", function() {
	console.log("\nBYE BYE !!!");
	process.exit(0);
});