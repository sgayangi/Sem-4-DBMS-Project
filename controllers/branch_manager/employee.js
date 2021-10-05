
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const BranchManager = require('../../models/BranchManager');
const Lookup = require('../../models/Lookup');
const Employee = require('../../models/Employee');


function validateEmployee(Employee) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    // console.log(date);
    const schema = Joi.object({
        'full_name': Joi.string().required(),
        'address': Joi.string().required(),
        'date_of_birth': Joi.date().max(cutoffDate), //if less than 18 display error
        'salary': Joi.number().positive().precision(2).required(),
        'date_of_employment': Joi.date().required(),
        'email': Joi.string().email().required(),
        'password': Joi.string().required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });

    return schema.validate(Employee);
}
// POST REQUESTS

// URL:localhost:3000/branch_manager/employee/create
const createEmployee = async (request, response) => {
    console.log(request.body);
    const { error } = validateEmployee(request.body);
    if (error) {
        var err_msg = "Your passwords do not match";
        return response.render('branch_manager/employee_error', {
            error_msg: err_msg,
            post_body: request.body,
            dob: Lookup.getBirthdayLimit(),
            today: Lookup.getTodayDate()

        });
    }

    if (await Employee.isEmailRegistered(request.body.email)) {
        var err_msg = "This email address has already been registered";
        return response.render('branch_manager/employee_error', {
            error_msg: err_msg,
            dob: Lookup.getBirthdayLimit(),
            post_body: request.body,
            today: Lookup.getTodayDate()
        });
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    request.body.branch_id = request.user.branch_id;

    try {
        const result = await BranchManager.enterEmployee(_.pick(request.body,
            ["full_name", "address","branch_id", "date_of_birth", "salary", "date_of_employment", "email", "password"]));
    } catch (error) {
        return response.status(500).render('500', {
            err_msg: error
        });
    }
    return response.status(200).redirect('/branch_manager');
};

exports.createEmployee = createEmployee;

