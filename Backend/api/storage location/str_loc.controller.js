const {
    create,
    getStorages,
    getStorageByrackID,
    updateStorage,
    deleteStorage,
  } = require("./str_loc.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createStorage: (req, res) => {
      const body = req.body;
  
      create(body, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: 0,
            message: "Database connection error",
          });
        }
        return res.status(200).json({
          success: 1,
          data: results,
        });
      });
    },
    getStorages: (req, res) => {
      getStorages((err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    },
    getStorageByrackID: (req, res) => {
      const st_id = req.params.st_id;
      getStorageByrackID(st_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Recode not found",
          });
        }
        return res.json({
          success: 1,
          data: results,
        });
      });
    },
    updateStorage: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      
      updateStorage(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update storage",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteStorage: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const st_id = req.params.st_id;
      deleteStorage(st_id, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Recode not found",
          });
        }
        return res.json({
          success: 1,
          message: "storage location deleted successfully",
        });
      });
    },
  };