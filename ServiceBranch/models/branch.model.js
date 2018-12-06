const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({  
    vendor_id: Number,
    branch_name: String,
    lat: Number,
    lng: Number,
    province_id: Number,
    kota_id: Number,
    kecamatan_id: Number,
    kelurahan_id: Number,

}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', BranchSchema);