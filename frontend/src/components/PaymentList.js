import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class PaymentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      payment: [],
      method: [],
      type: [],
      paytype_method: "",
      paym_id: "",
      paym_name: "",
      pay_id: "",
      pay_paidAmount: "",
      pay_totInvoiceAmount: "",
      pay_balance: "",
      paytype_id: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/payment").then((response) => {
      this.setState({
        payment: response.data.data,
      });
      console.log(response.data.data);
    });

    axios.get("http://localhost:4000/api/payType").then((response) => {
      this.setState({
        type: response.data.data,
      });
      console.log(response.data.data);
    });

    axios.get("http://localhost:4000/api/payMethod").then((response) => {
      this.setState({
        method: response.data.data,
      });
      console.log(response.data.data);
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/payment", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/payment", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deletePayment = (pay_id) => {
    axios
      .delete("http://localhost:4000/api/payment/" + pay_id)
      .then((response) => {
        if (response.data != null) {
          alert("Payment item deleted succesfully.");

          this.setState({
            payment: this.state.payment.filter(
              (data) => data.pay_id !== pay_id
            ),
          });
        }
        console.log(response);
      });
  };

  findPaymentById = (pay_id) => {
    axios
      .get("http://localhost:4000/api/payment/" + pay_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.pay_id);
          this.setState({
            pay_id: data.pay_id,
            paym_id: data.paym_id,
            pay_paidAmount: data.pay_paidAmount,
            pay_totInvoiceAmount: data.pay_totInvoiceAmount,
            pay_balance: data.pay_balance,
            paytype_id: data.paytype_id,
          });
        }
      });
  };

  render() {
    const {
      paym_id,
      pay_paidAmount,
      pay_totInvoiceAmount,
      pay_balance,
      paytype_id,
    } = this.state;

    return (
      <body data-sidebar="dark">
        <Main />

        <div class="main-content">
          <div class="page-content">
            <div class="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title mb-4">Payment List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#AddModal"
                          >
                            + Payment
                          </button>
                        </div>
                        <div class="col-xl-2">
                          <div id="datatable_filter" class="dataTables_filter">
                            <label>
                              Search:
                              <input
                                type="search"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="datatable"
                              ></input>
                            </label>
                          </div>
                        </div>
                      </div>
                      {/*************** Table View *******************/}

                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap mb-0">
                          <thead className="table-light">
                            <tr>
                              <th style={{ width: "20px" }}>
                                <div className="form-check font-size-16 align-middle">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck01"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck01"
                                  />
                                </div>
                              </th>
                              <th className="align-middle">Paym_name</th>
                              <th className="align-middle">PaidAmount</th>
                              <th className="align-middle">
                                TotalInvoiceAmount
                              </th>
                              <th className="align-middle">Payment balance</th>
                              <th className="align-middle">PayType_method</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.payment.map((data) => {
                              return (
                                <tr key={data.pay_id}>
                                  <td>
                                    <div className="form-check font-size-16">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="transactionCheck02"
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="transactionCheck02"
                                      />
                                    </div>
                                  </td>
                                  <td>{data.paym_name}</td>
                                  <td>{data.pay_paidAmount}</td>
                                  <td>{data.pay_totInvoiceAmount}</td>
                                  <td>{data.pay_balance}</td>
                                  <td>{data.paytype_method}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findPaymentById.bind(
                                        this,
                                        data.pay_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deletePayment.bind(
                                        this,
                                        data.pay_id
                                      )}
                                    >
                                      <i class="mdi mdi-trash-can d-block " />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      {/* end table-responsive */}
                    </div>
                  </div>
                </div>
              </div>
              {/* end row */}
              {/* container-fluid */}
              {/* End Page-content */}
              {/* Transaction Modal */}

              {/* end modal */}
            </div>
          </div>
        </div>

        {/*************** Add modal *******************/}

        <div>
          <div
            id="AddModal"
            className="modal fade"
            tabIndex={-1}
            aria-labelledby="#exampleModalFullscreenLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title mb-6">Add Payment</h4>
                          <form onSubmit={this.handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    PaymentMethod Name
                                  </label>
                                  <select
                                    id="formrow-inputPaymentId"
                                    className="form-select"
                                    name="paym_id"
                                    value={paym_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.method.map((data) => (
                                      <option
                                        key={data.paym_id}
                                        value={data.paym_id}
                                      >
                                        {data.paym_id} {}
                                        {data.paym_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Paid Amount
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_paidAmount"
                                    value={pay_paidAmount}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Total Invoice Amount
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_totInvoiceAmount"
                                    value={pay_totInvoiceAmount}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Balance
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_balance"
                                    value={pay_balance}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Payment Type Method
                                  </label>
                                  <select
                                    id="formrow-inputPaymentId"
                                    className="form-select"
                                    name="paytype_id"
                                    value={paytype_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.type.map((data) => (
                                      <option
                                        key={data.paytype_id}
                                        value={data.paytype_id}
                                      >
                                        {data.paytype_id} {}
                                        {data.paytype_method}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="gridCheck"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="gridCheck"
                                >
                                  Check me out
                                </label>
                              </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                              <button
                                type="submit"
                                class="btn btn-primary waves-effect waves-light"
                                value="submit"
                              >
                                Submit
                              </button>
                              <button
                                type="reset"
                                class="btn btn-secondary waves-effect"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
          </div>
        </div>

        {/*************** end Add modal *******************/}

        {/*************** update modal *******************/}
        <div>
          <div
            id="edit"
            className="modal fade"
            tabIndex={-1}
            aria-labelledby="#exampleModalFullscreenLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-body">
                          <h4 className="card-title mb-6">Update Payment</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    PaymentMethod Name
                                  </label>
                                  <select
                                    id="formrow-inputPaymentId"
                                    className="form-select"
                                    name="paym_id"
                                    value={this.state.paym_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.method.map((data) => (
                                      <option
                                        key={data.paym_id}
                                        value={data.paym_id}
                                      >
                                        {data.paym_id} {}
                                        {data.paym_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Paid Amount
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_paidAmount"
                                    value={this.state.pay_paidAmount}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Total Invoice Amount
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_totInvoiceAmount"
                                    value={this.state.pay_totInvoiceAmount}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Balance
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pay_balance"
                                    value={this.state.pay_balance}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Payment Type Method
                                  </label>
                                  <select
                                    id="formrow-inputPaymentId"
                                    className="form-select"
                                    name="paytype_id"
                                    value={this.state.paytype_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.type.map((data) => (
                                      <option
                                        key={data.paytype_id}
                                        value={data.paytype_id}
                                      >
                                        {data.paytype_id} {}
                                        {data.paytype_method}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="gridCheck"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="gridCheck"
                                >
                                  Check me out
                                </label>
                              </div>
                            </div>
                            <div class="d-flex flex-wrap gap-2">
                              <button
                                type="submit"
                                class="btn btn-primary waves-effect waves-light"
                                value="submit"
                              >
                                Update
                              </button>
                              <button
                                type="reset"
                                class="btn btn-secondary waves-effect"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </form>
                        </div>
                        {/* end card body */}
                      </div>
                      {/* end card */}
                    </div>
                  </div>
                </div>
              </div>
              {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
          </div>
        </div>
      </body>
    );
  }
}
