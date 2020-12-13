// const log = require('simple-node-logger').createSimpleLogger('test.log');
const log = require('./logger');
log.info('RUN');
// log.setLevel('info');
log.log('aaa');
log.info('subscription to ');

log.warn('nie zestaj sie', {chuj: 997, jaaa: 'ugabuga'});
log.error('jest pizda');
log.trace('trace');
log.fatal('pizda w chuj');
log.debug('???')

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