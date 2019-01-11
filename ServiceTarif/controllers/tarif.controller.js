const Tarif = require('../models/tarif.model.js');
const tarifValidator = require('../validators/tarif.validator.js');

exports.create = (req,res) => {
    tarifValidator.validate('create', req.body).then(status => {
        
        const coordinates = req.body.coordinates;
        coordinates[0] = parseFloat(coordinates[0]);
        coordinates[1] = parseFloat(coordinates[1]);
        const tarif = new Tarif({
            branch_id: req.body.branch_id,
            vendor_name: req.body.vendor_name,
            vendor_detail_id: req.body.vendor_detail_id,
            branch_location: {
                type: "Point",
                coordinates: coordinates
            },
            branch_province_id: req.body.branch_province_id,
            branch_province_name: req.body.branch_province_name,
            branch_village_id: req.body.branch_village_id,
            branch_village_name: req.body.branch_village_name,
            branch_regency_id: req.body.branch_regency_id,
            branch_regency_name: req.body.branch_regency_name,
            branch_district_id: req.body.branch_district_id,
            branch_district_name: req.body.branch_district_name,
            destination_province_id: req.body.destination_province_id,
            destination_province_name: req.body.destination_province_name,
            destination_village_id: req.body.destination_village_id,
            destination_village_name: req.body.destination_village_name,
            destination_regency_id: req.body.destination_regency_id,
            destination_regency_name: req.body.destination_regency_name,
            destination_district_id: req.body.destination_district_id,
            destination_district_name: req.body.destination_district_name,
            service_name: req.body.service_name,
            price: req.body.price,
            min_kg: req.body.min_kg,
            estimation_days: req.body.estimation_days
        });

        tarif.save().then(data => {
            res.send({
                status_code: 200,
                message: 'Success',
                data: data
            });
        }).catch(err => {
            console.log(err);
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
};

exports.getByVendor = (req, res) => {
    
    Tarif.find({ vendor_detail_id:req.params.vendorId }).sort({createdAt: -1})
    .then(tarif => {
        // if(tarif.length <= 0) {
        //     return res.status(404).send({
        //         message: "Tarif not found with vendor id " + req.params.vendorId
        //     });
        // }
        res.send({ status_code: 200, message: 'Success', data: tarif });
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status_code: 404,
                message: "Tarif not found with id " + req.params.vendorId
            });
        }
        return res.status(500).send({
            // message: "Error retrieving note with id " + req.params.branchId
            message: err.message
        });
    });
}

exports.findTarif = (req, res) => {
    
    Tarif.findById(req.params.tarifId)
    .then(tarif => {
        
        // if(tarif.length <= 0) {
        //     return res.status(404).send({
        //         message: "Tarif not found with vendor id " + req.params.vendorId
        //     });
        // }
        res.send({ status_code: 200, message: 'Success', data: tarif });
        
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status_code: 404,
                message: "Tarif not found with id " + req.params.tarifId
            });
        }
        return res.status(500).send({
            // message: "Error retrieving note with id " + req.params.branchId
            message: err.message
        });
    });
}

exports.getNearTarifs = (req, res) => {

    const origin = req.query.origin_province_id;
    const destination = req.query.destination_district_id;
    const userLocations = [ parseFloat(req.query.lng), parseFloat(req.query.lat)];
    console.log({userLocations});
    Tarif.find({
        branch_location: {
            $nearSphere: {
                $geometry: {
                    type: "Point",
                    coordinates: userLocations
                },
                $minDistance: 0,
                $maxDistance: 2000
            }
        },
        destination_district_id: destination
    }).then(tarifs => {
        res.send({ status_code: 200, message: 'Success', data: tarifs });
    }, errors => {
        console.log(errors);
        return res.send({
            status_code: 404,
            message: "Tarif not found with id " + req.query.origin_province_id
        });
    })

    // Tarif.find({ 
    //     branch_location: {
    //         $nearSphere: {
    //             $geometry: {
    //                 type: "Point",
    //                 coordinates: [106.773595, -6.23682]
    //             },
    //             $minDistance: 0,
    //             $maxDistance: 1
    //         }
    //     },
    //     branch_province_id: "31",
    //     destination_district_id: "1702034"
    //  }).sort({createdAt: -1})
};

// exports.create = (req,res) => {

//     branchValidator.validate('create', req.body).then(status => {
        
//         const branch = new Branch({
//             vendor_detail_id   : req.body.vendor_detail_id,
//             branch_name : req.body.branch_name,
//             lat         : req.body.lat,
//             lng         : req.body.lng,
//             province_id : req.body.province_id,
//             province_name: req.body.province_name,
//             village_id  : req.body.village_id,
//             village_name  : req.body.village_name,
//             regency_id  : req.body.regency_id,
//             regency_name  : req.body.regency_name,
//             district_id : req.body.district_id,
//             district_name : req.body.district_name,
//         });
    
//         branch.save().then(data => {
//             res.send({
//                 status_code: 200,
//                 message: 'Success',
//                 data: data
//             });
//         }).catch(err => {
//             res.status(500).send({
//                 message: {errors: err.message || "Some error occurred while creating the Note." }
//             });
//         });

//     })
//     .catch(errors => {
//         console.log(errors);
//         res.send({
//             status_code: 400,
//             message: {errors: errors }
//         });
//     });
// }

// exports.get = (req,res) => {
//     Branch.find()
//     .then(branches => {
//         res.send(branches);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving notes."
//         });
//     });
// };

// exports.getByVendor = (req,res) => {

//     Branch.find({ vendor_detail_id:req.params.vendorId }).sort({createdAt: -1})
//     .then(branch => {
//         if(branch.length <= 0) {
//             return res.status(404).send({
//                 message: "Branch not found with vendor id " + req.params.vendorId
//             });            
//         }
//         res.send({data: branch });
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Branch not found with id " + req.params.branchId
//             });                
//         }
//         return res.status(500).send({
//             // message: "Error retrieving note with id " + req.params.branchId
//             message: err.message
//         });
//     });

// };

// exports.find = (req,res) => {

//     Branch.findById(req.params.branchId)
//     .then(branch => {
//         if(!branch) {
//             return res.status(404).send({
//                 message: "Branch not found with id " + req.params.branchId
//             });            
//         }
//         res.send(branch);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Branch not found with id " + req.params.branchId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving note with id " + req.params.branchId
//         });
//     });
    
// };

// exports.update = (req,res) => {

// };

// exports.delete = (req,res) => {

// };