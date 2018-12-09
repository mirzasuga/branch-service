const Branch = require('../models/branch.model.js');

exports.create = (req,res) => {
    console.log(req.body);
    const required = [
        'vendor_detail_id',
        'branch_name',
        'lat',
        'lng',
        'province_id',
        'village_id',
        'regency_id',
        'district_id'
    ];
    const errors = [];
    // asdasdasd
    required.map(field => {
        if(req.body[field] == "" || req.body[field] === null || req.body[field] == undefined ) {
            const show = field.split('_').join(' ').toUpperCase();
            let err = {
                field: field,
                message: `${show} can not be empty`
            };
            errors.push(err);
        }
    })
    if(errors.length > 0) {
        res.send({
            status_code: 400,
            message: { errors: errors }
        });
    }

    const branch = new Branch({
        vendor_detail_id   : req.body.vendor_detail_id,
        branch_name : req.body.branch_name,
        lat         : req.body.lat,
        lng         : req.body.lng,
        province_id : req.body.province_id,
        village_id  : req.body.village_id,
        regency_id  : req.body.regency_id,
        district_id : req.body.district_id,
    });

    branch.save().then(data => {
        res.send({
            status_code: 200,
            message: 'Success',
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
}

exports.get = (req,res) => {
    Branch.find()
    .then(branches => {
        res.send(branches);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.getByVendor = (req,res) => {

    Branch.find({ vendor_id:req.params.vendorId })
    .then(branch => {
        if(branch.length <= 0) {
            return res.status(404).send({
                message: "Branch not found with vendor id " + req.params.vendorId
            });            
        }
        res.send({data: branch });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });                
        }
        return res.status(500).send({
            // message: "Error retrieving note with id " + req.params.branchId
            message: err.message
        });
    });

};

exports.find = (req,res) => {

    Branch.findById(req.params.branchId)
    .then(branch => {
        if(!branch) {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });            
        }
        res.send(branch);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + req.params.branchId
        });
    });
    
};

exports.update = (req,res) => {

};

exports.delete = (req,res) => {

};