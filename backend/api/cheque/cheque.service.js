const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into cheque(cheq_id,	cheq_number,	cheq_bank, cheq_supc_id)
                        values(?,?,?,?)`,
      [data.cheq_id, data.cheq_number, data.cheq_bank, data.cheq_supc_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getCheques: (callback) => {
    pool.query(
      `select cheq_id,	cheq_number,	cheq_bank, cheq_supc_id from cheque`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getChequeByChequeNo: (cheq_id, callback) => {
    pool.query(
      `select cheq_id,cheq_number,cheq_bank,cheq_supc_id from cheque where cheq_id = ?`,
      [cheq_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateCheque: (data, callback) => {
    pool.query(
      `update cheque set cheq_number=?,cheq_bank=?,cheq_supc_id=? where cheq_id =?`,

      [data.cheq_number, data.cheq_bank, data.cheq_supc_id, data.cheq_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteCheque: (cheq_id, callback) => {
    pool.query(
      `delete from cheque where cheq_id = ?`,
      [cheq_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
