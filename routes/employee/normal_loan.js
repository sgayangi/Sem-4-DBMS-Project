const express = require('express');
const router = express.Router();
const {
    getNormalLoan,
    createNormalLoan,
    searchNormalLoan
} = require('../../controllers/employee/normal_loan');
const isEmployee = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');


router.get('/', [isLoggedIn, isEmployee], getNormalLoan);

router.post('/', [isLoggedIn, isEmployee], createNormalLoan);

router.get('/search', [isLoggedIn, isEmployee], (req, res) => {
    return res.render('employee/search_loan');
});

router.post('/search', [isLoggedIn, isEmployee], searchNormalLoan);


module.exports = router;