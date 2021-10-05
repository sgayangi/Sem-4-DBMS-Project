const express = require('express');
const router = express.Router();
const isLoggedIn = require('../../middleware/login');
const isEmployee = require('../../middleware/employee');
const path = require('path');
const {createCheckingAccount, getCheckingAccountForm} = require('../../controllers/employee/checking_account')

router.get('/', [isLoggedIn, isEmployee], getCheckingAccountForm);

// route to create new checking account
// http://localhost:3000/employee/checking_account
router.post('/', [isLoggedIn, isEmployee], createCheckingAccount);

module.exports = router;
