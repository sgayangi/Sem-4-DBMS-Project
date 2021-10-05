const express = require('express');
const router = express.Router();


// localhost:3000/customer/login/corporate
router.get('/corporate', (request, response) => {
    response.render('customer/corporate_login', {
        hasError: false
    });
});


// localhost:3000/customer/login/individual

router.get('/individual', (request, response) => {
    response.render('customer/individual_login', {
        hasError: false
    });

});

module.exports = router;