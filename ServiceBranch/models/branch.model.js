const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({  
    vendor_detail_id: Number,
    branch_name: String,
    lat: String,
    lng: String,
    province_id: String,
    province_name: String,
    regency_id: String,
    regency_name: String,
    district_id: String,
    district_name: String,
    village_id: String,
    village_name: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', BranchSchema);