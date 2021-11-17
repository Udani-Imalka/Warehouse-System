const {
    createExpenses,
    getExpenses,
    getExpensesByexpID,
    updateExpenses,
    deleteExpenses,
  } = require("./expenses.controller");
  const router = require("express").Router();
  
  router.post("/", createExpenses);
  router.get("/", getExpenses);
  router.get("/:exp_id", getExpensesByexpID);
  router.patch("/", updateExpenses);
  router.delete("/:exp_id", deleteExpenses);
  
  module.exports = router;
  