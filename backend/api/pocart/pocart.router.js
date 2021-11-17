const { addNewPoc, getAllPoc, getPocByID, updatePoc, deletePoc } = require("./pocart.controller");

const router = require("express").Router();

router.post("/", addNewPoc);
router.get("/", getAllPoc);
router.get("/:id", getPocByID);
router.put("/", updatePoc);
router.delete("/:id", deletePoc);

module.exports = router;
