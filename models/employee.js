const { pool } = require('../startup/mysql_database');

class Employee {


    static enterCheckingAccount(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_checking_account (?,?,?,?)",
                [
                    body.customer_id,
                    body.started_date,
                    body.bank_balance,
                    body.branch_id,

                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    resolve(console.log("succesful"));
                }
            )
        })
    }

    static getLoanPlans() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM loan_plan",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        reject(error);
                    };
                    resolve(results);
                }
            )
        })
        
    }

    static getLoanInformation(loan_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT COUNT(*) FROM loan WHERE loan_id = ?",
                [
                    loan_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    };
                    console.log(result.sql);
                    resolve(result.length!=0);
                }
            )
        })
    }

    static payLateInstallment(loan_id, installment_id, month, year) {
        console.log("Model");
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL pay_late_loan_installment (?,?,?,?)",
                [
                    loan_id, installment_id, month, year
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return reject(error);
                    };
                    console.log(result.sql);
                    return resolve(true);
                }
            )
        })
    }

    static payCurrentInstallment(loan_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL pay_loan_installment(?)",
                [
                    loan_id
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        return reject(error);
                    };
                    console.log(result.sql);
                    return resolve(true);
                }
            )
        })
    }

    static getLateInstallments(loan_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM late_loan_information WHERE loan_id=? AND status=? ORDER BY due_year, due_month",
                [loan_id, "Not paid"],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        return reject(error);
                    };
                    console.log(results);
                    return resolve(results);
                }
            )
        })
    }

    static getCurrentInstallments(loan_id) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM loan_installment WHERE loan_id=?",
                [loan_id],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        return reject(error);
                    };
                    console.log(result.sql);
                    console.log(results);
                    return resolve(results);
                }
            )
        })
    }

    static async isEmailRegistered(email) {
        var result = await new Promise((resolve, reject) => {
            const result = pool.query('SELECT employee_id FROM employee WHERE email = ?',
                [email],
                function (error, results) {
                    if (error) {
                        reject(new Error(error.message));
                    }
                    resolve(results);
                }
            )
        })

        return result.length != 0;
    }

    static enterFixedDeposit(body) {

        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_fixed_deposit (?,?,?,?,?,?,?)",
                [
                    body.fixed_deposit_plan_id,
                    body.branch_id,
                    body.savings_account_id,
                    body.customer_id,
                    body.deposit_amount,
                    body.monthly_addition,
                    body.started_date,
                ],
                function (error, results, fields) {
                    if (error) {
                        return reject(error);
                    };
                    return resolve(console.log("Succesful"));

                }
            )
        });

    }

    static enterNormalLoan(loan_plan_id, account_id, customer_id, branch_id, loan_installment, created_date, loan_amount) {

        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_normal_loan (?, ?, ?, ?, ?, ?, ?)",
                [
                    loan_plan_id,
                    account_id,
                    customer_id,
                    branch_id,
                    loan_installment,
                    created_date,
                    loan_amount
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        return reject(error);

                    };
                    return resolve(console.log("Succesful"));
                }
            )
        })
    }

    static enterSavingsAccount(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_savings_account (?,?,?,?,?,?,?,?)",
                [
                    body.branch_id,
                    body.customer_id,
                    body.started_date,
                    body.bank_balance,
                    body.no_of_withdrawals_remaining,
                    body.savings_plan_id,
                    body.max_withdrawal_limit,
                    body.source_of_funds,
                ],
                function (error, results, fields) {
                    if (error) {
                        reject(error);
                    };
                    console.log(result.sql);
                    resolve(console.log("succesful"));
                }
            )
        })

    }

    static createIndividualCustomer(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_individual_customer (?,?,?,?,?,?,?,?,?)",
                [
                    body.full_name,
                    body.address,
                    body.national_ID,
                    body.date_of_birth,
                    body.personal_contact_no,
                    body.residential_contact_no,
                    body.date_joined,
                    body.email,
                    body.password
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(result.sql);
                        reject(result);
                    };
                    
                    resolve(result);
                }
            )
        })
    }

    static createCorporateCustomer(body) {
        return new Promise((resolve, reject) => {
            const result = pool.query("CALL create_corporate_customer (?,?,?,?,?,?,?,?,?,?)",
                [
                    body.company_registration_number,
                    body.company_name,
                    body.corporate_email,
                    body.address,
                    body.date_of_establishment,
                    body.contact_no,
                    body.date_joined,
                    body.correspondent,
                    body.correspondent_email,
                    body.password
                ],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(console.log("Done"));
                }
            )
        })
    }

    static getAllSavingsAccountPlans() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM savings_account_plan",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    console.log(results);
                    resolve(results);
                }
            )
        })
        
    }

    static getSavingsAccountID() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'savings_account'",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(results);
                }
            )
        })

    }

    static getCheckingAccountID() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'checking_account'",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(results);
                }
            )
        })

    }

    

    static getAllFixedDepositPlans() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM fixed_deposit_plan",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(results);
                }
            )
        })

    }

    static getFixedDepositID() {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = 'bank' AND TABLE_NAME = 'fixed_deposit'",
                [],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(results);
                }
            )
        })

    }

    static findCustomerSavingsAccount(customerID) {
        return new Promise((resolve, reject) => {
            const result = pool.query("SELECT * FROM all_savings_accounts WHERE customer_id=?",
                [customerID],
                function (error, results, fields) {
                    if (error) {
                        console.log(error);
                        reject(result);
                    };
                    resolve(results);
                }
            )
        })

    }

}

module.exports = Employee;
