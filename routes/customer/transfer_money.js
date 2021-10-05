const express = require('express');
const router = express.Router();
const {getTransactionForm,TranferAmount,getTransactionFormChecking,TranferAmountChecking} = require('../../controllers/customer/transfer_money');

const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');

    
router.get('/savings_account',[isLoggedIn,isCustomer],getTransactionForm);
router.post('/savings_account',[isLoggedIn,isCustomer],TranferAmount);

router.get('/checking_account',[isLoggedIn,isCustomer],getTransactionFormChecking);
router.post('/checking_account',[isLoggedIn,isCustomer],TranferAmountChecking);
module.exports = router;