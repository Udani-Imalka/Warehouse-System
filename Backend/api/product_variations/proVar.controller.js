const {
    create,
    getVariations,
    getVariationsBypvarId,
    updateVariations,
    deleteVariations,
  } = require("./proVar.service");
  
  const { genSaltSync, hashSync } = require("bcrypt");
  
  module.exports = {
    createVariations: (req, res) => {
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
    getVariations: (req, res) => {
      getVariations((err, results) => {
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
    getVariationsBypvarId: (req, res) => {
      const pvar_id = req.params.pvar_id;
      getVariationsBypvarId(pvar_id, (err, results) => {
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
    updateVariations: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      // body.password = hashSync(body.password,salt);
      updateVariations(body, (err, results) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!results) {
          return res.json({
            success: 0,
            message: "Failes to update variation",
          });
        }
        return res.json({
          success: 1,
          message: "update successfully",
        });
      });
    },
    deleteVariations: (req, res) => {
      // const data = req.body;
      // const salt = genSaltSync(10);
      const pvar_id = req.params.pvar_id;
      deleteVariations(pvar_id, (err, results) => {
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
          message: "variation deleted successfully",
        });
      });
    },
  };