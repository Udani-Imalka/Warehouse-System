import React, { Component } from "react";
import Main from "./Main";

export default class Cheque extends Component {
  render() {
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
                      <h4 className="card-title mb-4">Cheque List</h4>
                      {/* <div class="page-title-box d-sm-flex align-items-center justify-content-between"> */}
                      {/* <div class="page-title-right">
                <a href="/#" class="btn btn-primary waves-effect waves-light">Add Product</a>
                </div> */}
                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Cheque
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
                        <div>
                          {/* <button type="button" className="btn btn-success waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">+ Add Unit</button> */}
                          {/* sample modal content */}
                          <div
                            id="exampleModalFullscreen"
                            className="modal fade"
                            tabIndex={-1}
                            aria-labelledby="#exampleModalFullscreenLabel"
                            aria-hidden="true"
                          >
                            <div className="modal-dialog ">
                              <div className="modal-content">
                                {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalFullscreenLabel">Fullscreen Modal Heading</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div> */}
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="card">
                                        <div className="card-body">
                                          <h4 className="card-title mb-6">
                                            Add Cheque
                                          </h4>
                                          <form>
                                            <div className="col-md-8">
                                              <div className="mb-6">
                                                <label
                                                  htmlFor="formrow-email-input"
                                                  className="form-label"
                                                >
                                                  Cheque No
                                                </label>
                                                <input
                                                  type="email"
                                                  className="form-control"
                                                  id="formrow-email-input"
                                                />
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-8">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-firstname-input"
                                                    className="form-label"
                                                  >
                                                    payId
                                                  </label>
                                                  <select
                                                    id="formrow-inputProductId"
                                                    className="form-select"
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                  </select>
                                                </div>
                                              </div>

                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputCity"
                                                    className="form-label"
                                                  >
                                                    Added Date
                                                  </label>
                                                  <div
                                                    className="input-group"
                                                    id="datepicker1"
                                                  >
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      placeholder="dd M, yyyy"
                                                      data-date-format="dd M, yyyy"
                                                      data-date-container="#datepicker1"
                                                      data-provide="datepicker"
                                                    />
                                                    <span className="input-group-text">
                                                      <i className="mdi mdi-calendar" />
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="mb-6">
                                                  <label
                                                    htmlFor="formrow-email-input"
                                                    className="form-label"
                                                  >
                                                    Bank
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    id="formrow-email-input"
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-md-10">
                                                <div className="mb-6">
                                                  <label
                                                    htmlFor="formrow-email-input"
                                                    className="form-label"
                                                  >
                                                    Status
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    id="formrow-email-input"
                                                  />
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
                                              >
                                                Submit
                                              </button>
                                              <button
                                                type="reset"
                                                class="btn btn-secondary waves-effect"
                                                data-bs-dismiss="modal"
                                              >
                                                Cancel
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
                                {/* <div className="modal-footer">
                <button type="button" className="btn btn-secondary waves-effect" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary waves-effect waves-light">Save changes</button>
              </div> */}
                              </div>
                              {/* /.modal-content */}
                            </div>
                            {/* /.modal-dialog */}
                          </div>
                        </div>
                      </div>
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
                              <th className="align-middle">ChequeNo</th>
                              <th className="align-middle">pay Id</th>
                              <th className="align-middle">date</th>
                              <th className="align-middle">Bank</th>
                              <th className="align-middle">Status</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
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
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No1254
                                </a>{" "}
                              </td>
                              <td>pay1</td>
                              <td>2020.10.3</td>
                              <td>Peoples Bank</td>
                              <td>Status</td>

                              <td>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm edit"
                                >
                                  <i className="fas fa-pencil-alt" />
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check font-size-16">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck03"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck03"
                                  />
                                </div>
                              </td>
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No125
                                </a>{" "}
                              </td>
                              <td>pay2</td>
                              <td>2020.10.13</td>
                              <td>BOC Bank</td>
                              <td>Status1</td>

                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check font-size-16">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck04"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck04"
                                  />
                                </div>
                              </td>
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No1204
                                </a>{" "}
                              </td>
                              <td>pay3</td>
                              <td>2020.10.23</td>
                              <td>Peoples Bank</td>
                              <td>Status3</td>

                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check font-size-16">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck05"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck05"
                                  />
                                </div>
                              </td>
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No1054
                                </a>{" "}
                              </td>
                              <td>pay4</td>
                              <td>2020.11.3</td>
                              <td>Peoples Bank</td>
                              <td>Status4</td>

                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check font-size-16">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck06"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck06"
                                  />
                                </div>
                              </td>
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No1554
                                </a>{" "}
                              </td>
                              <td>pay5</td>
                              <td>2020.12.3</td>
                              <td>Peoples Bank</td>
                              <td>Status5</td>

                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <div className="form-check font-size-16">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="transactionCheck07"
                                  />
                                  <label
                                    className="form-check-label"
                                    htmlFor="transactionCheck07"
                                  />
                                </div>
                              </td>
                              <td>
                                <a href="/#" className="text-body fw-bold">
                                  No2254
                                </a>{" "}
                              </td>
                              <td>pay6</td>
                              <td>2020.02.3</td>
                              <td>Peoples Bank</td>
                              <td>Status6</td>

                              <td>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                >
                                  <i class="fas fa-pencil-alt"></i>
                                </a>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm delete"
                                >
                                  <i class="mdi mdi-trash-can d-block " />
                                </a>
                              </td>
                            </tr>
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
              <div
                className="modal fade transaction-detailModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="transaction-detailModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id="transaction-detailModalLabel"
                      >
                        Order Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <p className="mb-2">
                        Product id:{" "}
                        <span className="text-primary">#SK2540</span>
                      </p>
                      <p className="mb-4">
                        Billing Name:{" "}
                        <span className="text-primary">Neal Matthews</span>
                      </p>
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <div>
                                  <img
                                    src="assets/images/product/img-7.png"
                                    alt=""
                                    className="avatar-sm"
                                  />
                                </div>
                              </th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14">
                                    Wireless Headphone (Black)
                                  </h5>
                                  <p className="text-muted mb-0">$ 225 x 1</p>
                                </div>
                              </td>
                              <td>$ 255</td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <div>
                                  <img
                                    src="assets/images/product/img-4.png"
                                    alt=""
                                    className="avatar-sm"
                                  />
                                </div>
                              </th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14">
                                    Phone patterned cases
                                  </h5>
                                  <p className="text-muted mb-0">$ 145 x 1</p>
                                </div>
                              </td>
                              <td>$ 145</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <h6 className="m-0 text-right">Sub Total:</h6>
                              </td>
                              <td>$ 400</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <h6 className="m-0 text-right">Shipping:</h6>
                              </td>
                              <td>Free</td>
                            </tr>
                            <tr>
                              <td colSpan={2}>
                                <h6 className="m-0 text-right">Total:</h6>
                              </td>
                              <td>$ 400</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end modal */}
            </div>
          </div>
        </div>
      </body>
    );
  }
}