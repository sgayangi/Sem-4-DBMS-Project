const express = require('express');
const router = express.Router();
var path = require("path");
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');
const Lookup = require('../../models/Lookup');

const {
    createCorporateCustomer,
    createIndividualCustomer,
    findCustomerProfile,
    getCustomerSavingsAccounts,
    getCustomerCheckingAccounts,
    getCustomerFixedDeposits
} = require('../../controllers/employee/customer');

// GET REQUESTS

// http://localhost:3000/employee/customer/individual
router.get('/individual', [isLoggedIn, isEmployee], (request, response) => {
    
    const today = Lookup.getTodayDate();
    const cutoffDate = Lookup.getBirthdayLimit();

    response.render('employee/individual', {
        dob: cutoffDate,
        today: today
    });
});

// http://localhost:3000/employee/customer/corporate
router.get('/corporate', [isLoggedIn, isEmployee], (request, response) => {
    const today = Lookup.getTodayDate();

    response.render('employee/corporate', {
        today: today
    });

});

// http://localhost:3000/employee/customer/individual
router.get('/individual/create_error', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/individual_error');
});

// http://localhost:3000/employee/customer/corporate
router.get('/corporate/create_error', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/corporate_error');
});

router.post('/individual', [isLoggedIn, isEmployee], createIndividualCustomer);

router.post('/corporate', [isLoggedIn, isEmployee], createCorporateCustomer);

router.post('/find_customer_profile', [isLoggedIn, isEmployee], findCustomerProfile);

router.get('/view_all_savings_accounts', [isLoggedIn, isEmployee], getCustomerSavingsAccounts);

router.get('/view_all_checking_accounts', [isLoggedIn, isEmployee], getCustomerCheckingAccounts);

router.get('/view_all_fixed_deposits', [isLoggedIn, isEmployee], getCustomerFixedDeposits);

// http://localhost:3000/employee/customer/functions
router.get('/functions', [isLoggedIn, isEmployee], (request, response) => {
    response.render('employee/service_a_customer');
});


module.exports = router;
