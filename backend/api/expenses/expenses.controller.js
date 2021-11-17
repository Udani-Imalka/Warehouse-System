const {
    create,
    getExpenses,
    getExpensesByexpID,
    updateExpenses,
    deleteExpenses,
  } = require("./expenses.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createExpenses: (req, res) => {
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
    getExpenses: (req, res) => {
      getExpenses((err, results) => {
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
    getExpensesByexpID: (req, res) => {
      const exp_id = req.params.exp_id;
      getExpensesByexpID(exp_id, (err, results) => {
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
    updateExpenses: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updateExpenses(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update expenses",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteExpenses: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const exp_id = req.params.exp_id;
      deleteExpenses(exp_id, (err, results) => {
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
          message: "expenses deleted successfully",
        });
      });
    },
  };
  