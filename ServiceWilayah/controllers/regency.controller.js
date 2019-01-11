const Regency = require('../models/regency.model.js');

exports.findById = (req,res) => {
    Regency.findOne({regency_id: req.params.regencyId})
    .then(regency => {
        
        if(!regency) {
            res.status(404).send({
                message: "regency not found with id " + req.params.regencyId
            });            
        }
        res.send(regency);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "regency not found with id " + req.params.regencyId
            });
        }
        return res.status(500).send({
            message: "Error retrieving regency with id " + req.params.regencyId
        });
    });
};

exports.getRegenciesByProvince = async (req,res) => {
    let query = {province_id: req.params.provinceId};
    if(req.body.name) {
        query = {
            province_id: req.params.provinceId,
            name: new RegExp(req.body.name, "i")
        };
    }

    console.log({query});

    const regencies = await Regency.find(query)
        .then(regencies => regencies )
        .catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "regencies not found with id " + req.params.provinceId
                });
            }
            return res.status(500).send({
                message: "Error retrieving regency with id " + req.params.provinceId
            });
        });
        
    res.send({
        status_code: 200,
        message: 'Success',
        data: regencies
    });

};