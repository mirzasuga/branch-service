const mongoose = require('mongoose');
const ProvinceSchema = mongoose.Schema({
    province_id: String,
    name: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Province', ProvinceSchema);