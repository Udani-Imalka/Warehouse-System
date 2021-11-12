const {
  createUnit,
  getUnits,
  getUnitByUnitId,
  updateUnit,
  deleteUnit,
} = require("./unit.controller");
const router = require("express").Router();

router.post("/", createUnit);
router.get("/", getUnits);
router.get("/:punit_id", getUnitByUnitId);
router.patch("/", updateUnit);
router.delete("/:punit_id", deleteUnit);

module.exports = router;
