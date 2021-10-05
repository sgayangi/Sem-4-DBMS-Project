const { func } = require('joi');
const Joi = require('joi');
const _ = require('lodash');
const { tranferMoneyChecking } = require('../../models/Customer');

const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

function validateTranasaction(trans) {

    const schema = Joi.object({
        "initiating_account_id": Joi.number().integer().required(),
        "receiving_account_id": Joi.number().integer().required(),
        "transaction_amount": Joi.number().positive().precision(2).required(),
    });
    return schema.validate(trans);

}

const getTransactionForm = async (request,response)=>{
    try {
        const today = await Lookup.getTodayDate();
        const savingsIds = await Customer.getAllSavingsAccountIDs(request.user.customer_id);
        console.log(savingsIds);
        response.render('customer/transfer_money.ejs',{
            today:today,
            savingsIds:savingsIds
        })
    } catch (error) {
        return response.status(500).render('500', {
            err_msg: error
        });
    }

}

const getTransactionFormChecking = async (request,response)=>{
    try {
        const today = await Lookup.getTodayDate();
        const savingsIds = await Customer.getAllCheckingAccountIDs(request.user.customer_id);
        console.log(savingsIds);
        response.render('customer/transfer_money.ejs',{
            today:today,
            savingsIds:savingsIds
        })
    } catch (error) {
        response.status(400).render('400', {
            err_msg:error
        });
    }
}


const TranferAmount = async (request,response)=>{
    const {error} = validateTranasaction(_.pick(request.body, ["initiating_account_id", "receiving_account_id","transaction_amount"]));

    if (error) return response.status(400).render('400', {
        err_msg: "Invalid Token"
    });

    if(request.body.initiating_account_id == request.body.receiving_account_id){
        return response.render('400.ejs',{err_msg:"Account numbers cant be the same"});
    }
    try {

        const result = await Customer.tranferMoneySavings(_.pick(request.body, ["initiating_account_id", "receiving_account_id", "transaction_amount"]))
            return response.redirect('/');
    } catch (error) {
        
        return response.status(500).render("500", {
            err_msg: error.message
        });
    }



}

const TranferAmountChecking = async (request,response)=>{
    const {error} = validateTranasaction(_.pick(request.body, ["initiating_account_id", "receiving_account_id","transaction_amount"]));

    if(error) return response.status(404).render('400',{err_msg: error.details[0].message});

    if(request.body.initiating_account_id == request.body.receiving_account_id){
        return response.render('400.ejs',{err_msg:"Account numbers cant be the same"});
    }
    try {
        const result = await Customer.tranferMoneyChecking(_.pick(request.body, ["initiating_account_id", "receiving_account_id", "transaction_amount"]));
        
            return response.redirect('/');
    } catch (error) {
        return response.status(500).render("500", {
            err_msg: "Insufficient bank balance"
        });
    }

}
exports.getTransactionForm = getTransactionForm;
exports.TranferAmount = TranferAmount;
exports.getTransactionFormChecking = getTransactionFormChecking;
exports.TranferAmountChecking = TranferAmountChecking;