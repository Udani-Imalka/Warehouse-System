const {
  create,
  getUnits,
  getUnitByUnitId,
  updateUnit,
  deleteUnit,
} = require("./unit.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  createUnit: (req, res) => {
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
  getUnits: (req, res) => {
    getUnits((err, results) => {
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
  getUnitByUnitId: (req, res) => {
    const punit_id = req.params.punit_id;
    getUnitByUnitId(punit_id, (err, results) => {
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
  updateUnit: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password,salt);
    updateUnit(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failes to update unit",
        });
      }
      return res.json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  deleteUnit: (req, res) => {
    // const data = req.body;
    const punit_id = req.params.punit_id;
    //const salt = genSaltSync(10);
    deleteUnit(punit_id, (err, results) => {
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
        message: "unit deleted successfully",
      });
    });
  },
};
