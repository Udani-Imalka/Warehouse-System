const {
  create,
  getCategorys,
  getCategoryByCategoryId,
  updateCategory,
  deleteCategory,
} = require("./category.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  createCategory: (req, res) => {
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
  getCategorys: (req, res) => {
    getCategorys((err, results) => {
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
  getCategoryByCategoryId: (req, res) => {
    const cat_id = req.params.cat_id;
    getCategoryByCategoryId(cat_id, (err, results) => {
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
  updateCategory: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password,salt);
    updateCategory(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failes to update category",
        });
      }
      return res.json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  deleteCategory: (req, res) => {
    // const data = req.body;
    // const salt = genSaltSync(10);
    const cat_id = req.params.cat_id;
    deleteCategory(cat_id, (err, results) => {
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
        message: "category deleted successfully",
      });
    });
  },
};
