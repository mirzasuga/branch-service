const District = require('../models/district.model.js');

exports.findById = (req,res) => {

};

exports.getDistrictByRegency = async (req,res) => {
    const districts = await District.find({regency_id: req.params.regencyId})
        .then(districts => districts )
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Districts not found with id " + req.params.regencyId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Districts with id " + req.params.regencyId
            });
        });
        
    res.send({
        status_code: 200,
        message: 'Success',
        data: districts
    });
};