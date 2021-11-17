const { addNewGRN, getAllGRN, getGRNByID, updateGRN, deleteGRN } = require("../grn/grn.controller");

const router = require("express").Router();

router.post("/", addNewGRN);
router.get("/", getAllGRN);
router.get("/:id", getGRNByID);
router.put("/", updateGRN);
router.delete("/:id", deleteGRN);

module.exports = router;
