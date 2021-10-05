const express = require('express');
const router = express.Router();
const {
    viewProfileInformation
} = require('../../controllers/customer/profile');

const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');

/**
 * @url: http://localhost:3000/customer/profile
 */
router.get('/', [isLoggedIn, isCustomer], viewProfileInformation);

module.exports = router;