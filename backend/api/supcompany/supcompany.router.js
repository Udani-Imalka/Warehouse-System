const { addNewSupCompany, getAllSupCompnies, getSupCompanyByID, updateSupCompany, deleteSupCompany } = require("./supcompany.controller");

const router = require("express").Router();

router.post("/", addNewSupCompany);
router.get("/", getAllSupCompnies);
router.get("/:id", getSupCompanyByID);
router.put("/", updateSupCompany);
router.delete("/:id", deleteSupCompany);

module.exports = router;
