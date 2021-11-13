const { addNewGRNinv, getAllGRNinv, getGRNinvByID, updateGRNinv, deleteGRNinv } = require("../grn invoice/grninv.controller");

const router = require("express").Router();

router.post("/", addNewGRNinv);
router.get("/", getAllGRNinv);
router.get("/:id", getGRNinvByID);
router.put("/", updateGRNinv);
router.delete("/:id", deleteGRNinv);

module.exports = router;
