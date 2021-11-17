const {
  create,
  getCheques,
  getChequeByChequeNo,
  updateCheque,
  deleteCheque,
} = require("./cheque.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  createCheque: (req, res) => {
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
  getCheques: (req, res) => {
    getCheques((err, results) => {
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
  getChequeByChequeNo: (req, res) => {
    const cheq_id = req.params.cheq_id;
    getChequeByChequeNo(cheq_id, (err, results) => {
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
  updateCheque: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password,salt);
    updateCheque(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failes to update cheque",
        });
      }
      return res.json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  deleteCheque: (req, res) => {
    // const data = req.body;
    // const salt = genSaltSync(10);
    const cheq_id = req.params.cheq_id;
    deleteCheque(cheq_id, (err, results) => {
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
        message: "cheque deleted successfully",
      });
    });
  },
};
