
const Joi = require('joi');
const _ = require('lodash');
const Employee = require('../../models/Employee');
const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

function validateFixedDeposit(account) {

    const schema = Joi.object({
        "fixed_deposit_plan_id": Joi.number().integer().required(),
        "branch_id": Joi.number().integer().required(),
        "savings_account_id": Joi.number().integer().required(),
        "customer_id": Joi.number().integer().required(),
        "deposit_amount": Joi.number().required().positive().precision(2),
        "started_date": Joi.date().required()

    });
    return schema.validate(account);
}

const getFixedDepositForm = async (request, response) => {
    try {
        const plans = await Employee.getAllFixedDepositPlans();
        const fd_id = await Employee.getFixedDepositID();
        const sa_id = await Customer.getAllSavingsAccountIDs(request.session.customer_id);
        const date = Lookup.getTodayDate();
        return response.status(200).render('employee/fixed_deposit', {
            customer_id: request.session.customer_id,
            plans: plans,
            id: fd_id[0].AUTO_INCREMENT,
            savingsIds: sa_id,
            branch_id: request.user.branch_id,
            date: date
        });
    } catch (error) {
        return response.render('500', {
            err_msg: error
        });
    }
};


// route to create new savings account
const createFixedDeposit = async (request,response)=>{
    const {error} = validateFixedDeposit(_.pick(request.body, ["fixed_deposit_plan_id", "branch_id", "savings_account_id", "customer_id","deposit_amount","started_date"]));
    if(error){
        return response.status(400).render('400', {
            err_msg: error
        });
    }
    const interest_rates = request.body.interest_rate;
    const interest_rate = parseFloat(interest_rates[parseInt(request.body.fixed_deposit_plan_id)-1]);

    request.body.monthly_addition = parseFloat(request.body.deposit_amount) * (interest_rate) /1200;
    try {
        await Employee.enterFixedDeposit(_.pick(request.body, ["fixed_deposit_plan_id", "branch_id", "savings_account_id", "customer_id","deposit_amount","monthly_addition","started_date"]));
    } catch (error) {
        return response.status(400).render('400', {
            err_msg: error.message
        });
    }
    return response.render('employee/customer_profile_and_functions', {
        customerExists: true,
        profile: request.session.profile,
        privilege_level: request.session.privilege_level
    });

};

module.exports.getFixedDepositForm = getFixedDepositForm;
module.exports.createFixedDeposit = createFixedDeposit;



