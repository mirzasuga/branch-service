const Branch = require('../models/branch.model.js');
const branchValidator = require('../validators/branch.validator.js');

exports.create = (req,res) => {

    branchValidator.validate('create', req.body).then(status => {
        
        const branch = new Branch({
            vendor_detail_id   : req.body.vendor_detail_id,
            branch_name : req.body.branch_name,
            lat         : req.body.lat,
            lng         : req.body.lng,
            province_id : req.body.province_id,
            province_name: req.body.province_name,
            village_id  : req.body.village_id,
            village_name  : req.body.village_name,
            regency_id  : req.body.regency_id,
            regency_name  : req.body.regency_name,
            district_id : req.body.district_id,
            district_name : req.body.district_name,
        });
    
        branch.save().then(data => {
            res.send({
                status_code: 200,
                message: 'Success',
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                message: {errors: err.message || "Some error occurred while creating the Note." }
            });
        });

    })
    .catch(errors => {
        console.log(errors);
        res.send({
            status_code: 400,
            message: {errors: errors }
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

    Branch.find({ vendor_detail_id:req.params.vendorId }).sort({createdAt: -1})
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