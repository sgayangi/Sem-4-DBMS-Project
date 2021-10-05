const express = require('express');
const router = express.Router();
const {createOnlineLoan,loadOnlineLoanForm} = require('../../controllers/customer/online_loan')
const isLoggedIn = require('../../middleware/login');
const isCustomer = require('../../middleware/customer');
/**
 * @todo: html file
 */

 //http://localhost:3000/customer/loan/online
router.get('/online',[isLoggedIn,isCustomer],loadOnlineLoanForm );

router.post('/online', createOnlineLoan);



module.exports= router;