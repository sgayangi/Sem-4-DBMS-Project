const express = require('express');
const path = require('path');
const router = express.Router();

// localhost:3000/branch_manager/login
router.get('/', (request, response) => {
    response.render('branch_manager/login', {
        hasError:false
    });
});

module.exports = router;