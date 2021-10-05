const router = require('express').Router();
var path = require("path");
const isLoggedIn = require('../../middleware/login');
const isBranchManager = require('../../middleware/branch_manager');
const { createEmployee } = require('../../controllers/branch_manager/employee');
const Lookup = require('../../models/Lookup');

// GET REQUESTS
router.get('/create', [isLoggedIn, isBranchManager], (request, response) => {
    const today = Lookup.getTodayDate();
    response.render('branch_manager/employee', {
        dob: Lookup.getBirthdayLimit(),
        today: today
    });
});

// POST REQUESTS

// URL localhost:3000/branch_manager/employee/create
router.post('/create', [isLoggedIn, isBranchManager], createEmployee);

module.exports = router;
