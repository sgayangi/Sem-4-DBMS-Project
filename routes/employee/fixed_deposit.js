const express = require('express');
const router = express.Router();
const { createFixedDeposit, getFixedDepositForm} = require('../../controllers/employee/fixed_deposit');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
const path = require('path');

/**
 * @url : http://localhost:3000/employee/fixed_deposit
 */

router.get('/', [isLoggedIn, isEmployee], getFixedDepositForm);

// route to create new savings account
router.post('/',[isLoggedIn,isEmployee], createFixedDeposit);

module.exports = router;



