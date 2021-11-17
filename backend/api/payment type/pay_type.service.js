const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into payment_type(paytype_id,	paytype_method,	paytype_cust_id)
                        values(?,?,?)`,
      [data.paytype_id,data.paytype_method,	data.paytype_cust_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPay_types: (callback) => {
    pool.query(
      `select paytype_id,	paytype_method,	paytype_cust_id from payment_type `,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPay_typeBypTypeID: (paytype_id, callback) => {
    pool.query(
      `select paytype_id,	paytype_method,	paytype_cust_id from payment_type where paytype_id = ?`,
      [paytype_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updatePay_type: (data, callback) => {
    pool.query(
      `update payment_type set paytype_method=?,	paytype_cust_id=?  where paytype_id =?`,

      [data.paytype_method,	data.paytype_cust_id, data.paytype_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deletePay_type: (paytype_id, callback) => {
    pool.query(
      `delete from payment_type where paytype_id = ?`,
      [paytype_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
