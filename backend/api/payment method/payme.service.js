const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into payment_methods(paym_id, paym_name,	paym_type)
                        values(?,?,?)`,
      [data.paym_id,data.paym_name,data.paym_type],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPay_method: (callback) => {
    pool.query(
      `select paym_id, paym_name, paym_type from payment_methods `,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getPay_methodBypMethodID: (paym_id, callback) => {
    pool.query(
      `select paym_id, paym_name, paym_type from payment_methods where paym_id = ?`,
      [paym_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updatePay_method: (data, callback) => {
    pool.query(
      `update payment_methods set paym_name=?, paym_type=?  where paym_id =?`,

      [data.paym_name,data.paym_type, data.paym_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deletePay_method: (paym_id, callback) => {
    pool.query(
      `delete from payment_methods where paym_id = ?`,
      [paym_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
