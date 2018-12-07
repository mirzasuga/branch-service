    const branch = require('../controllers/branch.controller.js');
    const express = require('express');
    const router = express.Router();

    // get all branches
    router.get('/all', branch.get);

    // create branch
    router.post('/create', branch.create);

    // get all vendor branches
    router.get('/vendor/:vendorId', branch.getByVendor);

    // find branch
    router.get('/:branchId', branch.find);

    // update branch
    router.put('/:branchId', branch.update);

    // delete branch
    router.delete('/:branchId', branch.delete);

module.exports = router;