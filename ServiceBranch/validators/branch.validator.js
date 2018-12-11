const Validator = require('./Validator.js');
const rules = {

    create: {
        vendor_detail_id: 'required',
        branch_name: 'required|max:255',
        lat: 'required',
        lng: 'required',
        province_id: 'required',
        province_name: 'required',
        village_id: 'required',
        village_name: 'required',
        regency_id: 'required',
        regency_name: 'required',
        district_id: 'required',
        district_name: 'required'
    }
}

exports.validate = (ruleType, data) => Validator.validate(rules[ruleType], data);