const _ = require('lodash');
const BranchManager = require('../../models/BranchManager');


const generateReport = async (request, response) => {
    console.log(request.body);
    const branch_id = request.user.branch_id;
    const month = request.body.month;
    const year = request.body.year;
    let results;
    if (request.body.type == "Generate Transactions Report") {
        try {
            if(branch_id ==1){
                console.log('giyaaaa');
                results = await BranchManager.getAllTransationsHO(month, year);
            }
            else{
                results = await BranchManager.getAllTransations(branch_id, month, year);

            }
            
            return response.status(200).render('branch_manager/transactions_report', {
                transactions: results,
                branch:branch_id
            });
        } catch (error) {
            return response.render('500', {
                err_msg: error
            });
        }
    }
    else if (request.body.type == "Generate Late Loan Installment Report") {
        let results;
        try {
            if(branch_id == 1){
                results = await BranchManager.getLateLoanInstallmentsHO( month, year);

            }
            else{
                results = await BranchManager.getLateLoanInstallments( branch_id,month, year);

            }
             
            return response.status(200).render('branch_manager/late_loan_report', {
                month: month,
                year:year,
                installments: results,
                branch:branch_id
            });
        } catch (error) {
            return response.render('500', {
                err_msg: error
            });
        }
    }
}


exports.generateReport = generateReport;

