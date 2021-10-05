
const routes = require('express').Router();
const home = require('./home');
const login = require('./login');
const logout = require('./logout');

// this is the path taken to register new users
routes.use('/', home);
routes.use('/login', login);
routes.use('/logout', logout);

routes.use('/employee', require('./employee'))
routes.use('/customer', require('./customer'))
routes.use('/branch_manager', require('./branch_manager'))

module.exports = routes;