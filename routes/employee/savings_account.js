const express = require('express');
const router = express.Router();
const { createSavingsAccount,getSavingsAccountForm } = require('../../controllers/employee/savings_account');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
// URL: localhost:3000/employee/savings_account/create
// Method: GET
// route to create new savings account
router.get('/', [isLoggedIn, isEmployee], getSavingsAccountForm);


// URL: localhost:3000/employee/savings_account
// Method: POST
// route to create new savings account
router.post('/', [isLoggedIn, isEmployee], createSavingsAccount);


module.exports = router;
