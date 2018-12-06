const mongoose = require('mongoose');

const RegencySchema = mongoose.Schema({
    regency_id: String,
    province_id: String,
    name: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Regency', RegencySchema);