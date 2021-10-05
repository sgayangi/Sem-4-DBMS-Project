
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const Employee = require('../../models/Employee');
const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

// =================================VALIDATIONS=================================================//

function validateIndividual(customer) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));

    const schema = Joi.object({
        "full_name": Joi.string().required().min(5), //the name must have at least two words seperated by a space
        "address": Joi.string().required(),
        "national_ID": Joi.string().required().min(10),
        "date_of_birth": Joi.date().max(cutoffDate).required()
            .messages({
                'date.max': `You must be at least 18 years old to register.`
            }),
        "residential_contact_no": Joi.string().required().min(10),
        "personal_contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validate(customer);
}

function validateCorporate(company) {
    const schema = Joi.object({
        "company_registration_number": Joi.string().required(),
        "company_name": Joi.string().min(3).required(),
        "corporate_email": Joi.string().email().required(),
        "address": Joi.string().required(),
        "date_of_establishment": Joi.date().required(), //Constraints must be checked
        "contact_no": Joi.string().required().min(10),
        "date_joined": Joi.string().required(), // Constraints must be checked
        "correspondent": Joi.string().required(),
        "correspondent_email": Joi.string().email().required(),
        "password": Joi.string().min(5).max(1024).required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validate(company);
}

// =================================================MAIN ROUTE FUNCTIONALITY=========================================================//
const createIndividualCustomer = async (request, response) => {
    const {error} = validateIndividual(request.body);

    if (error) {
        console.log(error);
        var err_msg = "Your passwords do not match";
        return response.render('employee/individual_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    if (await Customer.isIndividualEmailRegistered(request.body.email)) {
        var err_msg = "This email address has already been registered";
        return response.render('employee/individual_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.createIndividualCustomer(_.pick(request.body,
                    ["full_name", "address", "national_ID", "date_of_birth", "personal_contact_no", "residential_contact_no", "date_joined", "email", "password"]));

    } catch (error) {
        console.log(error);
        return response.status(400).render('400', {
            err_msg: error
        });
    }
    return response.status(200).redirect('/employee');
};

const createCorporateCustomer = async (request, response) => {
    console.log(request.body);
    const {error} = validateCorporate(request.body);
    if (error) {
        console.log(error);
        var err_msg = "Your passwords do not match";
        return response.render('employee/corporate_error', {
            error_msg: err_msg,
            post_body: request.body,
            today: Lookup.getTodayDate()
        });
    }

    if (await Customer.isCorporateEmailRegistered(request.body.corporate_email)) {
        var err_msg = "This email address has already been registered";
        return response.render('employee/corporate_error', {
            error_msg: err_msg,
            post_body: request.body,
            today: Lookup.getTodayDate()
        });
    }
    
    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);
    try {
        const result = await Employee.createCorporateCustomer(_.pick(request.body,
            ["company_registration_number", "company_name", "corporate_email", "address", "date_of_establishment", "contact_no", "date_joined", "correspondent", "correspondent_email", "password"]));

    } catch (error) {
        return response.status(400).render('400', {
            err_msg: error
        });
    }
    return response.status(200).redirect('/employee');
};


const findCustomerProfile = async (req, res) => {
    console.log(req.body);
    const privilege_level = req.body.privilege_level;
    req.session.customer_id = req.body.customer_id;
    req.session.privilege_level = privilege_level;
    const profile = await Customer.getProfileInformation(req.body.customer_id,privilege_level);
    console.log("Profile");
    console.log(profile);
    if (!profile || profile.length == 0) {
        return res.render('employee/customer_profile_and_functions', {
            customerExists: false
        });
    }
    req.session.profile = profile;
    return res.render('employee/customer_profile_and_functions', {
        customerExists: true,
        profile: profile,
        privilege_level:privilege_level,
    }
    );
}

const getCustomerSavingsAccounts = async (req, res) => {
    const customer_id = req.session.customer_id;
    const savings_accounts = await Customer.getAllSavingsAccounts(customer_id);
    return res.render('employee/view_customer_savings_accounts', {
        savings_accounts: savings_accounts,
    });
    
}

const getCustomerCheckingAccounts = async (req, res) => {
    const customer_id = req.session.customer_id;
    const checking_accounts = await Customer.getAllCheckingAccounts(customer_id);
    return res.render('employee/view_customer_checking_accounts', {
        checking_accounts: checking_accounts,
    });

}

const getCustomerFixedDeposits = async (req, res) => {
    const customer_id = req.session.customer_id;
    const fixed_deposits = await Customer.getAllFixedDeposits(customer_id);
    return res.render('employee/view_customer_fixed_deposits', {
        fixed_deposits: fixed_deposits,
    });

}

module.exports.getCustomerSavingsAccounts = getCustomerSavingsAccounts;
module.exports.getCustomerCheckingAccounts = getCustomerCheckingAccounts;
module.exports.getCustomerFixedDeposits = getCustomerFixedDeposits;
module.exports.createCorporateCustomer = createCorporateCustomer;
module.exports.findCustomerProfile = findCustomerProfile;
module.exports.createIndividualCustomer = createIndividualCustomer;
