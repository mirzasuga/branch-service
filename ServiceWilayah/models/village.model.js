const mongoose = require('mongoose');

const VillageSchema = mongoose.Schema({
    village_id: String,
    district_id: String,
    name: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Village', VillageSchema);