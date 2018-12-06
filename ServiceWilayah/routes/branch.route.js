module.exports = (branchService) => {
    
    const branch = require('../controllers/branch.controller.js');

    // get all branches
    branchService.get('/branches', branch.get);

    // create branch
    branchService.post('/branch', branch.create);

    // get all vendor branches
    branchService.get('/branch/vendor/:vendorId', branch.getByVendor);

    // find branch
    branchService.get('/branch/:branchId', branch.find);

    // update branch
    branchService.put('/branch/:branchId', branch.update);

    // delete branch
    branchService.delete('/branch/:branchId', branch.delete);

}