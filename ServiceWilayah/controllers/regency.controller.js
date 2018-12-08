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

    const regencies = await Regency.find({province_id: req.params.provinceId})
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