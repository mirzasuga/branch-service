const CONFIG = require('./config');

module.exports = {
    url: `mongodb://${CONFIG.mongodb_host}/${CONFIG.mongodb_db}`
}