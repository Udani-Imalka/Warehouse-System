const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into product_unit(punit_id,	punit_name,	punit_qty)
                        values(?,?,?)`,
      [data.punit_id,	data.punit_name,	data.punit_qty],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUnits: (callback) => {
    pool.query(
      `select punit_id, punit_name,	punit_qty from product_unit`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getUnitByUnitId: (punit_id, callback) => {
    pool.query(
      `select punit_id, punit_name,	punit_qty from product_unit where punit_id = ?`,
      [punit_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateUnit: (data, callback) => {
    pool.query(
      `update product_unit set punit_name=?,	punit_qty=?  where punit_id =?`,

      [data.punit_name,	data.punit_qty, data.punit_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteUnit: (punit_id, callback) => {
    pool.query(
      `delete from product_unit where punit_id = ?`,
      [punit_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
