const Branch = require('../models/branch.model.js');

exports.create = (req,res) => {
    
    if(!req.body.vendor_id) {
        return res.status(400).send({
            message: "Branch content can not be empty"
        });
    }

    const branch = new Branch({
        vendor_id   : req.body.vendor_id,
        branch_name : req.body.branch_name,
        lat         : req.body.lat,
        lng         : req.body.lng,
        province_id : req.body.province_id,
        kota_id     : req.body.kota_id,
        kecamatan_id: req.body.kecamatan_id,
        kelurahan_id: req.body.kelurahan_id,
    });

    branch.save().then(data => {
        res.send(data);
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