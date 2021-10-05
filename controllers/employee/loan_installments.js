const Employee = require('../../models/Employee');

const getLoanInstallmentInformation = async (req, res)=>{
    const loan_id = req.session.loan_id;
    try {
        const late_installments = await Employee.getLateInstallments(loan_id);

        if (late_installments.length>0)
        {
                return res.render('employee/loan_installment_page', {
                    is_late: true,
                    loan_id:loan_id,
                    installments: late_installments
                }
            );
        }
        else {
            const current_installments = await Employee.getCurrentInstallments(loan_id);
            return res.render('employee/loan_installment_page', {
                loan_id: loan_id,
                is_late: false,
                installments: current_installments
            });
        }
    }
    catch (error) {
        console.log(error);
        return response.render('500', {
            err_msg: error
        });
    }
}

const payLateLoanInstallment = async (req, res) => {
    const loan_id = req.session.loan_id;
    try {
        const result = await Employee.payLateInstallment(loan_id, req.body.installment_id, req.body.due_month, req.body.due_year);
    } catch (error) {
        console.log(error);
        return response.render('500', {
            err_msg: error
        });
    }
    return res.status(200).redirect('back');
}

const payCurrentLoanInstallment = async (req, res) => {
    const loan_id = req.session.loan_id;
    try {
        const late_installments = await Employee.payCurrentInstallment(loan_id);

    } catch (error) {
        console.log(error);
        return response.render('500', {
            err_msg: error
        });
    }
    return res.status(200).redirect('back');

}

module.exports.payLateLoanInstallment = payLateLoanInstallment;
module.exports.payCurrentLoanInstallment = payCurrentLoanInstallment;
module.exports.getLoanInstallmentInformation = getLoanInstallmentInformation;
