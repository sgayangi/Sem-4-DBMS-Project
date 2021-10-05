module.exports = function (request, response, next) {

    console.log(request.privilege_level);

    if (!(request.user.privilege_level == 3 ||request.user.privilege_level == 4))
    {
        return response.status(401).render("401");
    }
    console.log("customer")
    next();
    
}