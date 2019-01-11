const Village = require('../models/village.model.js');

exports.findById = (req, res) => {

};

exports.getDetails = (req, res) => { };

exports.getVillagesByDistrict = async (req, res) => {

    let query = { district_id: req.params.districtId };
    if(req.body.name) {
        query = {
            district_id: req.params.districtId,
            name: new RegExp(req.body.name, "i")
            
        };
    }
    console.log({query});

    const villages = await Village.find(query)
        .then(villages => villages)
        .catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Villages not found with id " + req.params.districtId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Villages with id " + req.params.districtId
            });
        });

    res.send({
        status_code: 200,
        message: 'Success',
        data: villages
    });

};