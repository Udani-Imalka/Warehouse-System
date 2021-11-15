const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into recode_history(rec_id,	p_id,	st_id,	qty,	add_date,	exp	,mfd)
                        values(?,?,?,?,?,?,?)`,
      [data.rec_id,	data.p_id,	data.st_id,	data.qty,	data.add_date,	data.exp,	data.mfd],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getRecodes: (callback) => {
    pool.query(
      `select rec_id,	p_name,	st_name,	qty,	add_date,	exp,	mfd	
      from  recode_history,products,storage_location
      where products.p_id= recode_history.p_id and storage_location.st_id= recode_history.st_id`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getRecodeByrecID: (rec_id, callback) => {
    pool.query(
      `select rec_id,	p_id,	st_id,	qty,	add_date,	exp,	mfd	
      from recode_history where rec_id = ?`,
      [rec_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateRecode: (data, callback) => {
    pool.query(
      `update recode_history set p_id=?,	st_id=?,	qty=?,	add_date=?,	exp=?,	mfd=?	
      where rec_id =?`,

      [data.p_id,	data.st_id,	data.qty,	data.add_date,	data.exp,	data.mfd, data.rec_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteRecode: (rec_id, callback) => {
    pool.query(
      `delete from recode_history where rec_id = ?`,
      [rec_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
