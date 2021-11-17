const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into payments(paym_id,	pay_paidAmount,	pay_totInvoiceAmount,	pay_balance, paytype_id)
                        values(?,?,?,?,?)`,
      [
        data.paym_id,
        data.pay_paidAmount,
        data.pay_totInvoiceAmount,
        data.pay_balance,
        data.paytype_id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPayments: (callback) => {
    pool.query(
      `select pay_id,	paym_name,	pay_paidAmount,	pay_totInvoiceAmount,	pay_balance,paytype_method 
      from payments,payment_type,payment_methods
      where payment_type.paytype_id= payments.paytype_id and payment_methods.paym_id= payments.pay_id `,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPaymentBypayID: (pay_id, callback) => {
    pool.query(
      `select pay_id,	pay_paym_id,	pay_paidAmount,	pay_totInvoiceAmount,	pay_balance, paytype_id from payments where pay_id = ?`,
      [pay_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updatePayment: (data, callback) => {
    pool.query(
      `update payments set pay_paym_id=?,	pay_paidAmount=?,	pay_totInvoiceAmount=?,	pay_balance=? , paytype_id=? where pay_id =?`,

      [
        data.pay_paym_id,
        data.pay_paidAmount,
        data.pay_totInvoiceAmount,
        data.pay_balance,
        data.pay_id,
        data.paytype_id,
      ],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deletePayment: (pay_id, callback) => {
    pool.query(
      `delete from payments where pay_id = ?`,
      [pay_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
