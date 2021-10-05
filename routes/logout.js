const routes = require('express').Router();
const { logout } = require('../controllers/logout');

routes.post('/', logout);
routes.get('/', logout);


module.exports = routes;
