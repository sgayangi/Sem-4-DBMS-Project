const express = require('express');
const router = express.Router();
const {
    getAllSavingsAccounts,
    getAllCheckingAccounts,
    getAllFixedDeposits,
    getAllSavingsAccountsForWithdraw,
    Withdraw,
    getAllSavingsAccountsForDeposit,
    deposit
} = require('../../controllers/customer/account');

const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');

/**
 * @url: http://localhost:3000/customer/account/savings_accounts
 */
router.get('/savings_accounts', [isLoggedIn, isCustomer], getAllSavingsAccounts);

/**
 * @url: http: //localhost:3000/customer/account/checking
 */
router.get('/checking_accounts', [isLoggedIn, isCustomer], getAllCheckingAccounts);

/**
 * @url: localhost:3000/customer/account/fixed_deposits
 */
router.get('/fixed_deposits', [isLoggedIn, isCustomer], getAllFixedDeposits);

/**
 * @url: http://localhost:3000/customer/account/withdraw_money
 */
router.get('/withdraw_money', [isLoggedIn, isCustomer], getAllSavingsAccountsForWithdraw);

/**
 * @url: http://localhost:3000/customer/account/withdraw_money
 */
router.post('/withdraw_money', [isLoggedIn, isCustomer], Withdraw);

/**
 * @url: http://localhost:3000/customer/account/deposits
 */
router.get('/deposits', [isLoggedIn, isCustomer], getAllSavingsAccountsForDeposit);

/**
 * @url: http://localhost:3000/customer/account/deposits
 */
router.post('/deposits', [isLoggedIn, isCustomer], deposit);

module.exports = router;