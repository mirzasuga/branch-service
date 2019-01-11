    const tarif = require('../controllers/tarif.controller.js');
    const express = require('express');
    const router = express.Router();

    router.post('/create', tarif.create);
    router.get('/all/vendor/:vendorId', tarif.getByVendor);
    router.get('/find/:tarifId', tarif.findTarif);
    router.get('/get',tarif.getNearTarifs);
module.exports = router;