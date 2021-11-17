const {
    create,
    getExpTypes,
    getExpTypeByexTypeID,
    updateExpType,
    deleteExpType,
  } = require("./exp_type.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createExpType: (req, res) => {
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
    getExpTypes: (req, res) => {
      getExpTypes((err, results) => {
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
    getExpTypeByexTypeID: (req, res) => {
      const exptype_id = req.params.exptype_id;
      getExpTypeByexTypeID(exptype_id, (err, results) => {
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
    updateExpType: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updateExpType(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update exp_Type",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteExpType: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const exptype_id = req.params.exptype_id;
      deleteExpType(exptype_id, (err, results) => {
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
          message: "Exp_Type deleted successfully",
        });
      });
    },
  };