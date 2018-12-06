const mongoose = require('mongoose');

const DistrictSchema = mongoose.Schema({
    district_id: String,
    regency_id: String,
    name: String

}, {
    timestamps: true
});

module.exports = mongoose.model('District', DistrictSchema);