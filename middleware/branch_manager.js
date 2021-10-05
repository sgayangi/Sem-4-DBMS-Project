module.exports = function (request, response, next) {
    
    if (request.user.privilege_level != 1)
    {
        return response.status(401).render("401");
    }

    next();

}