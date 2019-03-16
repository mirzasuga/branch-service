/*** CONFIGS */
const CONFIG = require('./configs/config');



const express = require('express');
const bodyParser = require('body-parser');
// const passport      = require('passport');
// const pe            = require('parse-error');
// const cors          = require('cors');
// const logger       = require('morgan');


// create express branch_service
const App = express();

// branchService.use(logger('dev'));
App.use( bodyParser.json() );
App.use( bodyParser.urlencoded({extended:true}) );

// Configuring the database
const dbConfig = require('./configs/database.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log(`Successfully connected to ${dbConfig.url}`);    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
const router = express.Router();
const branchRoute = require('./ServiceBranch/routes/branch.route.js');
const wilayahRoute = require('./ServiceWilayah/routes/wilayah.route.js');
const tarifRoute = require('./ServiceTarif/routes/tarif.route.js');

router.use('/branch', branchRoute);
router.use('/wilayah', wilayahRoute);
router.use('/tarif', tarifRoute);
router.get('/ping', (req,res) => {
    res.send({
        status_code: 200,
        message: 'Success'
    });
});
App.use('/api/v1', router);

App.listen(CONFIG.port, () => {
    console.log(CONFIG.service_name + `is Listening on port ${CONFIG.port}`)
});