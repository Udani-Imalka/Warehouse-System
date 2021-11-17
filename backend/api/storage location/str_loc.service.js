const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    pool.query(
      `insert into storage_location (st_id,	st_name,	st_location)
                        values(?,?,?)`,
      [data.st_id,data.st_name, data.st_location],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getStorages: (callback) => {
    pool.query(
      `select st_id,	st_name,	st_location from storage_location`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  getStorageByrackID: (st_id, callback) => {
    pool.query(
      `select st_id,	st_name,	st_location from storage_location  where st_id = ?`,
      [st_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results[0]);
      }
    );
  },
  updateStorage: (data, callback) => {
    pool.query(
      `update storage_location  set  st_name=?,	st_location=? where st_id =?`,

      [data.st_name, data.st_location,data.st_id],
      (error, results, fields) => {
        if (error) {
          callback(error);
        }
        return callback(null, results);
      }
    );
  },
  deleteStorage: (st_id, callback) => {
    pool.query(
      `delete from storage_location  where st_id = ?`,
      [st_id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
};
