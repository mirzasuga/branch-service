const mongoose = require('mongoose');


const TarifSchema = mongoose.Schema({
    branch_id: String,
    vendor_name: String,
    vendor_detail_id: String,
    branch_province_id: String,
    branch_province_name: String,
    branch_village_id: String,
    branch_village_name: String,
    branch_regency_id: String,
    branch_regency_name: String,
    branch_district_id: String,
    branch_district_name: String,
    branch_location: Object,
    destination_province_id: String,
    destination_province_name: String,
    destination_village_id: String,
    destination_village_name: String,
    destination_regency_id: String,
    destination_regency_name: String,
    destination_district_id: String,
    destination_district_name: String,
    service_name: String,
    price: Number,
    min_kg: Number,
    estimation_days: Number,
},
{
    timestamps: true
});

const TarifModel = mongoose.model('Tarif', TarifSchema);
module.exports = TarifModel;