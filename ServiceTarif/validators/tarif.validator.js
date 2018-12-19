const Validator = require('./Validator.js');
const rules = {

    create: {
        branch_id: 'required',
        vendor_name: 'required',
        vendor_detail_id: 'required',
        branch_location: 'required',
        branch_province_id: 'required',
        branch_province_name: 'required',
        branch_village_id: 'required',
        branch_village_name: 'required',
        branch_regency_id: 'required',
        branch_regency_name: 'required',
        branch_district_id: 'required',
        branch_district_name: 'required',
        destination_province_id: 'required',
        destination_province_name: 'required',
        destination_village_id: 'required',
        destination_village_name: 'required',
        destination_regency_id: 'required',
        destination_regency_name: 'required',
        destination_district_id: 'required',
        destination_district_name: 'required',
        service_name: 'required',
        price: 'required',
        min_kg: 'required',
        estimation_days: 'required'
    }
}

exports.validate = (ruleType, data) => Validator.validate(rules[ruleType], data);