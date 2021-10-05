const { pool } = require('../startup/mysql_database');

class Lookup{


    static getTodayDate() {
        let now = new Date();
        console.log(now);
        var dd = now.getDate();
        var mm = now.getMonth() + 1;
        var yyyy = now.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        const today = yyyy + '-' + mm + '-' + dd;
        return today;
    }

    static getBirthdayLimit() {
        let now = new Date();
        let cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18));
        var dd = cutoffDate.getDate();

        var mm = cutoffDate.getMonth() + 1;
        var yyyy = cutoffDate.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }
        cutoffDate = yyyy + '-' + mm + '-' + dd;
        console.log(cutoffDate);
        return cutoffDate;
    }


}

module.exports = Lookup;