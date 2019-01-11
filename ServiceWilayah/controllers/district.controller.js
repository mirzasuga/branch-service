const District = require('../models/district.model.js');

exports.findById = (req,res) => {

};

exports.getDistrictByRegency = async (req,res) => {

    let query = {regency_id: req.params.regencyId};
    if(req.body.name) {
        query = {
            regency_id: req.params.regencyId,
            name: new RegExp(req.body.name, "i")
        };
    }
    console.log({query});

    const districts = await District.find(query)
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

exports.searchBy = (req,res) => {
    const pattern = req.query.district_name;
    console.log(pattern);
    District.find({
        name: new RegExp(pattern, "i")
    })
    .limit(5)
    .then(districts => {
        
        res.send({
            status_code: 200,
            message: 'Success',
            data: districts
        });

    }, err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status_code: 404,
                message: "district not found with pattern " + req.query.district_name
            });
        }
        return res.status(500).send({
            message: "Error retrieving district with pattern " + req.query.district_name
        });
    });
};