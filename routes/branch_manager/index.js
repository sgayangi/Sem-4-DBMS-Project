const routes = require('express').Router();

routes.use('/employee', require('./employee'));
routes.use('/login', require('./login'));
routes.use('/report', require('./report'));
routes.use('/loans', require('./loans_approval'));


routes.get('/', (request, response) => {
    return response.render('branch_manager/home');
});

module.exports = routes;