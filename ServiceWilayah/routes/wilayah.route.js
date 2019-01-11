const express = require('express');
const router = express.Router();

const province = require('../controllers/province.controller.js');
const regency = require('../controllers/regency.controller.js');
const district = require('../controllers/district.controller.js');
const village = require('../controllers/village.controller.js');


/**
 * PROVINCEs
 */
router.get('/province/all', province.getProvinces);
router.get('/province/:provinceId', province.findById);
router.get('/province/search/by', province.searchBy);

/**
 * REGENCIEs
 */
router.get('/regencies/:provinceId', regency.getRegenciesByProvince);
router.get('/regency/:regencyId', regency.findById);

/**
 * DISTRICTs
 */
router.get('/districts/:regencyId', district.getDistrictByRegency);
router.get('/district/:districtId', district.findById);
router.get('/district/search/by', district.searchBy);

/**
 * VILLAGEs
 */
router.get('/villages/:districtId', village.getVillagesByDistrict);
router.get('/village/details/:villageId', village.getDetails);
router.get('/village/:villageId', village.findById);

module.exports = router;