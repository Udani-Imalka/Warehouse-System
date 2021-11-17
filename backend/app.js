const express = require("express");
const app = express();

const cors = require("cors")

app.use(express.json());
app.use(cors());

const userRouter = require("./api/user/user.router");
const supplierRouter = require("./api/supplier/supplier.router");
const porderRouter = require("./api/porder/porder.router");
const pocRouter = require("./api/pocart/pocart.router");
const grnRouter = require("./api/grn/grn.router");
const grnCartRouter = require("./api/grncart/grncart.router");
const grnInvoiceRouter = require("./api/grn invoice/grninv.router");
const supCompanyRouter = require("./api/supcompany/supcompany.router");

app.use("/warehouse/users", userRouter)
app.use("/warehouse/suppliers", supplierRouter)
app.use("/warehouse/porders", porderRouter)
app.use("/warehouse/poc",pocRouter)
app.use("/warehouse/grn",grnRouter)
app.use("/warehouse/grncart",grnCartRouter)
app.use("/warehouse/grninvoice",grnInvoiceRouter)
app.use("/warehouse/supcompany",supCompanyRouter)

/*
app.get("/", (req, res) => {
    res.json({
        success: 1,
        message: "This is working."
    });
});*/

app.listen(3030, () => {
    console.log("Server up and running...");
});