const express = require('express');
const router = express.Router();
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

const {
    getLoanInstallmentInformation,
    payLateLoanInstallment,
    payCurrentLoanInstallment
} = require('../../controllers/employee/loan_installments');


router.get('/', [isLoggedIn, isEmployee], getLoanInstallmentInformation);
router.post('/late', [isLoggedIn, isEmployee], payLateLoanInstallment);
router.post('/current', [isLoggedIn, isEmployee], payCurrentLoanInstallment);


module.exports = router;



