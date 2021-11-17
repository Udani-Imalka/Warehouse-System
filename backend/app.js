require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const unitRouter = require("./api/unit/unit.router");
const brandRouter = require("./api/brand/brand.router");
const categoryRouter = require("./api/category/category.router");
const chequeRouter = require("./api/cheque/cheque.router");
const expensesRouter = require("./api/expenses/expenses.router");
const expensesTypeRouter = require("./api/expenses_type/exp_type.router");
const paymentTypeRouter = require("./api/payment type/pay_type.router");
const paymentMethodRouter = require("./api/payment method/payme.router");
const paymentRouter = require("./api/payments/pay.router");
const productRouter = require("./api/product/product.router");
const productVariationRouter = require("./api/product_variations/proVar.router");
const recodeRouter = require("./api/recode history/rec.router");
const storageRouter = require("./api/storage location/str_loc.router");

app.use(express.json());

app.use("/api/units", cors(), unitRouter);
app.use("/api/brands", cors(), brandRouter);
app.use("/api/category", cors(), categoryRouter);
app.use("/api/cheque", cors(), chequeRouter);
app.use("/api/expenses", cors(), expensesRouter);
app.use("/api/expenses_type", cors(), expensesTypeRouter);
app.use("/api/payType", cors(), paymentTypeRouter);
app.use("/api/payment", cors(), paymentRouter);
app.use("/api/payMethod", cors(), paymentMethodRouter);
app.use("/api/product", cors(), productRouter);
app.use("/api/productVariation", cors(), productVariationRouter);
app.use("/api/recode", cors(), recodeRouter);
app.use("/api/storage", cors(), storageRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running on PORT : ", process.env.APP_PORT);
});
