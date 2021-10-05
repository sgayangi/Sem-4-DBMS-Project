DELIMITER $$
CREATE OR REPLACE TRIGGER `after_branch_manager_approval` AFTER UPDATE ON `normal_loan`
 FOR EACH ROW BEGIN
	DECLARE months INT DEFAULT 0;
	IF (NEW.status!=OLD.status AND NEW.status="Approved") THEN
    SELECT loan_period_in_months INTO months FROM loan_plan WHERE loan_plan.loan_plan_id = NEW.loan_plan_id;
	INSERT INTO `loan_installment`(`loan_id`, `due_date`, `loan_installment`,`remaining_no_of_installments`) VALUES (NEW.loan_id,CURRENT_DATE + INTERVAL 30 DAY,NEW.loan_installment,months);
	UPDATE savings_account SET bank_balance=bank_balance + NEW.loan_amount WHERE savings_account_id = NEW.account_id;
	END IF;
END $$
