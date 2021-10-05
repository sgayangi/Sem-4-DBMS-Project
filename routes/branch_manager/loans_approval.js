const router = require('express').Router();
var path = require("path");
const isLoggedIn = require('../../middleware/login');
const isBranchManager = require('../../middleware/branch_manager');
const { getPendingLoans, proceedLoan} = require('../../controllers/branch_manager/loans');
const Lookup = require('../../models/Lookup');

router.get('/pending',[isLoggedIn,isBranchManager], getPendingLoans);

router.post('/pending',[isLoggedIn,isBranchManager],proceedLoan);
module.exports = router;
