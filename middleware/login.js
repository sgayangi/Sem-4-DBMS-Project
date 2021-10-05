const jwt = require('jsonwebtoken');    //json web token
const config = require('config');

module.exports = function (request, response, next) {
    const token = request.session.token;
    //if no token, client doesnt have needed permissions
    if (!token || !request.session) {
        return response.status(401).redirect('/login');
    }
    try {
        const decoded = jwt.verify(token, config.get("jwtPrivateKey")); //this gives the payload
        request.user = decoded;
        next(); //calls the route handler
    } catch (error) {
        console.log(token);
        return response.status(400).render('400', {
            err_msg: "Invalid Token"
        });
    }
}
