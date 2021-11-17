const {
  createBrand,
  getBrands,
  getBrandByBrandId,
  updateBrand,
  deleteBrand,
} = require("./brand.controller");
const router = require("express").Router();

router.post("/", createBrand);
router.get("/", getBrands);
router.get("/:brand_id", getBrandByBrandId);
router.patch("/", updateBrand);
router.delete("/:brand_id", deleteBrand);

module.exports = router;
