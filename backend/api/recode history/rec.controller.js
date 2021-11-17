const {
    create,
    getRecodes,
    getRecodeByrecID,
    updateRecode,
    deleteRecode,
  } = require("./rec.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createRecode: (req, res) => {
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
    getRecodes: (req, res) => {
      getRecodes((err, results) => {
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
    getRecodeByrecID: (req, res) => {
      const rec_id = req.params.rec_id;
      getRecodeByrecID(rec_id, (err, results) => {
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
    updateRecode: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updateRecode(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update recode",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteRecode: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const rec_id = req.params.rec_id;
      deleteRecode(rec_id, (err, results) => {
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
          message: "recode deleted successfully",
        });
      });
    },
  };