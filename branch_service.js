/*** CONFIGS */
const CONFIG = require('./configs/config');



const express = require('express');
const bodyParser = require('body-parser');


// create express branch_service
const branchService = express();

branchService.use( bodyParser.urlencoded({extended:true}) );
// branchService.use( bodyParser.json() );

// Configuring the database
const dbConfig = require('./configs/database.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
branchService.get('/', (req, res) => {
    res.json({"message": "Welcome to Sipmen Branch Service"});
});

require('./routes/branch.route.js')(branchService);




branchService.listen(CONFIG.port, () => {
    console.log(CONFIG.service_name + `is Listening on port ${CONFIG.port}`)
});