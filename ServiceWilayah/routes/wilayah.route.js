module.exports = (app) => {
    
    const province = require('../controllers/province.controller.js');
    const regency = require('../controllers/regency.controller.js');
    const district = require('../controllers/district.controller.js');
    const village = require('../controllers/village.controller.js');


    /**
     * PROVINCEs
     */
    app.get('/provinces', province.getProvinces);
    app.get('/province/:provinceId', province.findById);

    /**
     * REGENCIEs
     */
    app.get('/regencies/:provinceId', regency.getRegenciesByProvince);
    app.get('/regency/:regencyId', regency.findById);

    /**
     * DISTRICTs
     */
    app.get('/districts/:regencyId', district.getDistrictByRegency);
    app.get('/district/:districtId', district.findById);

    /**
     * VILLAGEs
     */
    app.get('/village/details/:villageId', village.getDetails);
    app.get('/village/:villageId', village.findById);

}