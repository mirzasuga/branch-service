const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({  
    vendor_detail_id: Number,
    branch_name: String,
    lat: Number,
    lng: Number,
    province_id: String,
    regency_id: String,
    district_id: String,
    village_id: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', BranchSchema);