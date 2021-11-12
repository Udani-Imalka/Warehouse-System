import React, { Component } from "react";
import Main from "./Main";

export default class Supplier extends Component {
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
                      <h4 className="card-title mb-4">Supplier List</h4>
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
                            + Add Supplier
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
                                            Add Supplier
                                          </h4>
                                          <form>
                                            <div className="row">
                                              <div className="col-md-8">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-name-input"
                                                    className="form-label"
                                                  >
                                                    Supplier name
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-name-input"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-email-input"
                                                    className="form-label"
                                                  >
                                                    Email
                                                  </label>
                                                  <input
                                                    type="email"
                                                    className="form-control"
                                                    id="formrow-email-input"
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-input-contact"
                                                    className="form-label"
                                                  >
                                                    Contact number
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-input-contact"
                                                  />
                                                </div>
                                              </div>
                                            </div>

                                            <div class="mb-3">
                                              <label
                                                for="formrow-address-input"
                                                class="form-label"
                                              >
                                                Address
                                              </label>
                                              <input
                                                type="text"
                                                class="form-control"
                                                id="formrow-address-input"
                                              />
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

                              <th className="align-middle">SupID</th>
                              <th className="align-middle">Name</th>
                              <th className="align-middle">Contact</th>
                              <th className="align-middle">Email</th>
                              <th className="align-middle">Address</th>
                              <th className="align-middle">Status</th>
                              <th className="align-middle">Action</th>

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
                              <td data-field="id">1</td>
                              <td data-field="name">Maliban</td>
                              <td data-field="contat">0771236542</td>
                              <td data-field="email">david@gmail.com</td>
                              <td data-field="address">Colombo 12</td>
                              <td data-field="status">Active</td>

                              <td>
                                <a
                                  href="/"
                                  className="btn btn-outline-secondary btn-sm edit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#myUpdateModal"
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
                              <td data-field="id">2</td>
                              <td data-field="name">Unilever</td>
                              <td data-field="contat">0771236542</td>
                              <td data-field="email">david@gmail.com</td>
                              <td data-field="address">Colombo 12</td>
                              <td data-field="status">Inactive</td>
                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#myUpdateModal"
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
                              <td data-field="id">3</td>
                              <td data-field="name">Munchee</td>
                              <td data-field="contat">0771236542</td>
                              <td data-field="email">david@gmail.com</td>
                              <td data-field="address">Colombo 12</td>
                              <td data-field="status">Active</td>

                              <td>
                                <a
                                  href="/"
                                  class="btn btn-outline-secondary btn-sm edit"
                                  title="Edit"
                                  data-bs-toggle="modal"
                                  data-bs-target="#myUpdateModal"
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

              {/* end modal */}

              <div
                id="myUpdateModal"
                className="modal fade"
                tabIndex={-1}
                aria-labelledby="myModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="myModalLabel">
                        Update Supplier
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <h6>*All the fields are required</h6>

                      <div className="card mt-3">
                        <form>
                          <div className="row">
                            <div className="col-md-8">
                              <div className="mb-3">
                                <label
                                  htmlFor="formrow-name-input"
                                  className="form-label"
                                >
                                  Supplier name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="formrow-name-input"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="formrow-email-input"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="formrow-email-input"
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="formrow-input-contact"
                                  className="form-label"
                                >
                                  Contact number
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="formrow-input-contact"
                                />
                              </div>
                            </div>
                          </div>
                          <div class="mb-3">
                            <label
                              for="formrow-address-input"
                              class="form-label"
                            >
                              Address
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="formrow-address-input"
                            />
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
                          <div>
                            <button
                              type="submit"
                              className="btn btn-primary w-md float-right"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}