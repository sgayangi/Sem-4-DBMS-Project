const express = require('express');
const router = express.Router();

// URL: localhost:3000/employee/login
router.get('/', (request, response) => {
    response.render('employee/login', {
        hasError: false
    });
});

module.exports = router;