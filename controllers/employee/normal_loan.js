const Joi = require('joi');
const _ = require('lodash');
const Employee = require('../../models/Employee');
const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

function validateNormalLoan(NormalLoan) {

    const schema = Joi.object({
        "loan_plan_id": Joi.number().integer().required(),
        "account_id": Joi.number().integer().min(600001).required(),
        "loan_amount": Joi.number().positive().precision(2).required()
    });

    return schema.validate(NormalLoan);
}

const getNormalLoan = async (request, response) => {
    const savings_accounts = await Customer.getAllSavingsAccounts(request.session.customer_id);
    const today = Lookup.getTodayDate();
    try {
        const loan_plans = await Employee.getLoanPlans();
        return response.render('employee/normal_loan_creation_form', {
            today: today,
            loan_plans: loan_plans,
            savings_accounts: savings_accounts
        });
    }
    catch (error) {
        return response.render('500', {
            err_msg: error
        });
    }
    
};

const createNormalLoan = async (request,response) => {
    const { error } = validateNormalLoan(_.pick(request.body,
        ["loan_plan_id", "account_id", "loan_amount"]));
    if (error) return response.status(400).render('400',{err_msg: error.details[0].message});
    console.log(request.body);
    const loan_plan_id = request.body.loan_plan_id;
    const account_id = request.body.account_id;
    const created_date = Lookup.getTodayDate();
    const loan_amount = request.body.loan_amount;
    const months = parseInt(request.body.loan_period_in_months[parseInt(loan_plan_id)-1]);
    const interest = parseInt(request.body.interest_rate[parseInt(loan_plan_id)-1])
    let total_installment = parseFloat(loan_amount)*(interest/100)*(months/12);
    request.body.loan_installment = (total_installment+parseFloat(loan_amount))/months;

    try {
        await Employee.enterNormalLoan(loan_plan_id, account_id, request.session.customer_id, request.user.branch_id, request.body.loan_installment, created_date, loan_amount);
    } catch (error) {
                return response.status(400).render('400', {
                    err_msg: error
                });
    }

    return response.render('employee/customer_profile_and_functions', {
        customerExists: true,
        profile: request.session.profile,
        privilege_level: request.session.privilege_level,
        savings_accounts: request.session.savings_accounts,
        fixed_deposits: request.session.fixed_deposits,
        checking_accounts: request.session.checking_accounts
    });
    
};

const searchNormalLoan = async (req, res) => {
    try {
        const loanExists = await Employee.getLoanInformation(req.body.loan_id);
        if (loanExists) {
            req.session.loan_id = req.body.loan_id;
            return res.redirect('/employee/loan_installments');
            
        }
        return res.render('loan_search_error.ejs', {
            error: "Loan does not exist. Please enter valid loan ID"
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).render('500', {
            err_msg: error
        });;
    }
}

module.exports.getNormalLoan = getNormalLoan;
module.exports.searchNormalLoan = searchNormalLoan;
module.exports.createNormalLoan = createNormalLoan;