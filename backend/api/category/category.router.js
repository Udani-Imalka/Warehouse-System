const {
  createCategory,
  getCategorys,
  getCategoryByCategoryId,
  updateCategory,
  deleteCategory,
} = require("./category.controller");
const router = require("express").Router();

router.post("/", createCategory);
router.get("/", getCategorys);
router.get("/:cat_id", getCategoryByCategoryId);
router.patch("/", updateCategory);
router.delete("/:cat_id", deleteCategory);

module.exports = router;
