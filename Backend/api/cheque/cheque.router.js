const {
  createCheque,
  getCheques,
  getChequeByChequeNo,
  updateCheque,
  deleteCheque,
} = require("./cheque.controller");
const router = require("express").Router();

router.post("/", createCheque);
router.get("/", getCheques);
router.get("/:cheq_id", getChequeByChequeNo);
router.patch("/", updateCheque);
router.delete("/:cheq_id", deleteCheque);

module.exports = router;
