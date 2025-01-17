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
    .then(provinces => {
        
        res.send({
            status_code: 200,
            message: 'Success',
            data: provinces
        });

    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status_code: 404,
                message: "Province not found with id " + req.params.provinceId
            });
        }
        return res.status(500).send({
            message: "Error retrieving province with id " + req.params.provindeId
        });
    });
};

exports.searchBy = (req,res) => {
    const pattern = req.query.province_name;
    console.log(pattern);
    Province.find({
        name: new RegExp(pattern, "i")
    })
    .then(provinces => {
        
        res.send({
            status_code: 200,
            message: 'Success',
            data: provinces
        });

    }, err => {
        if(err.kind === 'ObjectId') {
            return res.send({
                status_code: 404,
                message: "Province not found with pattern " + req.query.province_name
            });
        }
        return res.status(500).send({
            message: "Error retrieving province with pattern " + req.query.province_name
        });
    });
};