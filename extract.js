// const dbConfig = require('./configs/database.js');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// // Connecting to the database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(() => {
//     console.log(`Successfully connected to ${dbConfig.url}`);    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });


// const fs = require('fs');
// const data = fs.readFileSync('./csv/villages.json', {encoding:'utf-8'});
// const a = data.split("\r\n");

// const model = require('./ServiceWilayah/models/village.model.js');
// const js = JSON.parse(data);

// model.insertMany(js, (res) => {
//     console.log(res);
// }, err => {console.log(err)});