const {
  create,
  getBrands,
  getBrandByBrandId,
  updateBrand,
  deleteBrand,
} = require("./brand.service");

const { genSaltSync, hashSync } = require("bcrypt");

module.exports = {
  createBrand: (req, res) => {
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
  getBrands: (req, res) => {
    getBrands((err, results) => {
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
  getBrandByBrandId: (req, res) => {
    const brand_id = req.params.brand_id;
    getBrandByBrandId(brand_id, (err, results) => {
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
  updateBrand: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    // body.password = hashSync(body.password,salt);
    updateBrand(body, (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Failes to update brand",
        });
      }
      return res.json({
        success: 1,
        message: "update successfully",
      });
    });
  },
  deleteBrand: (req, res) => {
    // const data = req.body;
    // const salt = genSaltSync(10);
    const brand_id = req.params.brand_id;
    deleteBrand(brand_id, (err, results) => {
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
        message: "brand deleted successfully",
      });
    });
  },
};
