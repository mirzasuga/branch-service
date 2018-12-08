const Village = require('../models/village.model.js');

exports.findById = (req, res) => {

};

exports.getDetails = (req, res) => { };

exports.getVillagesByDistrict = async (req, res) => {

    const villages = await Village.find({ district_id: req.params.districtId })
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