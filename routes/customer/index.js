const routes = require('express').Router();

routes.use('/loan', require('./online_loan'));
routes.use('/login', require('./login'));
routes.use('/account', require('./account'));
routes.use('/transfer_money', require('./transfer_money'));
routes.use('/profile', require('./profile'));

const isCustomer = require('../../middleware/employee');
const isLoggedIn = require('../../middleware/login');

routes.get('/', [isLoggedIn, isCustomer], (request, response) => {
    return response.render('customer/home');
});

module.exports = routes;