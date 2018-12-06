const Province = require('../models/province.model.js');

exports.findById = (req,res) => {
    
    Province.findOne({province_id: req.params.provinceId})
    .then(province => {
        
        if(!province) {
            res.status(404).send({
                message: "Province not found with id " + req.params.provinceId
            });            
        }
        res.send(province);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Province not found with id " + req.params.provinceId
            });
        }
        return res.status(500).send({
            message: "Error retrieving province with id " + req.params.provindeId
        });
    });

};

exports.getProvinces = (req,res) => {
    Province.find()
    .then(provinces => res.send(provinces) )
    .catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Province not found with id " + req.params.provinceId
            });
        }
        return res.status(500).send({
            message: "Error retrieving province with id " + req.params.provindeId
        });
    });
};