import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Cheque extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cheuqe: [],
      cheq_id: "",
      cheq_number: "",
      cheq_bank: "",
      cheq_supc_id: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/cheque").then((response) => {
      this.setState({
        cheuqe: response.data.data,
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
      .post("http://localhost:4000/api/cheque", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/cheque", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteCheque = (cheq_id) => {
    axios
      .delete("http://localhost:4000/api/cheque/" + cheq_id)
      .then((response) => {
        if (response.data != null) {
          alert("Cheque deleted succesfully.");

          this.setState({
            cheuqe: this.state.cheuqe.filter(
              (data) => data.cheq_id !== cheq_id
            ),
          });
        }
        console.log(response);
      });
  };

  findChequeById = (cheq_id) => {
    axios
      .get("http://localhost:4000/api/cheque/" + cheq_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.cheq_id);
          this.setState({
            cheq_id: data.cheq_id,
            cheq_number: data.cheq_number,
            cheq_bank: data.cheq_bank,
            cheq_supc_id: data.cheq_supc_id,
          });
        }
      });
  };

  render() {
    const { cheq_number, cheq_bank, cheq_supc_id } = this.state;

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
                      <h4 className="card-title mb-4">Cheque</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Cheque
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

                      {/************** Table View ******************/}
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
                              <th className="align-middle">Cheq_number</th>
                              <th className="align-middle">Cheq_bank</th>
                              <th className="align-middle">Cheq_supc_id</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.cheuqe.map((data) => {
                              return (
                                <tr key={data.cheq_id}>
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
                                  <td>{data.cheq_number}</td>
                                  <td>{data.cheq_bank}</td>
                                  <td>{data.cheq_supc_id}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findChequeById.bind(
                                        this,
                                        data.cheq_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteCheque.bind(
                                        this,
                                        data.cheq_id
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

        {/************** Add modal ******************/}

        <div>
          <div
            id="exampleModalFullscreen"
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
                          <h4 className="card-title mb-6">Add Cheque</h4>
                          <form onSubmit={this.handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Cheq_number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="cheq_number"
                                    value={cheq_number}
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
                                    Cheq_Bank
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name="cheq_bank"
                                    value={cheq_bank}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    cheq_supc_id
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name="cheq_supc_id"
                                    value={cheq_supc_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
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
        {/************** end Add modal ******************/}

        {/************** update modal ******************/}
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
                          <h4 className="card-title mb-6">Update Method</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    cheq_number
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="cheq_number"
                                    value={this.state.cheq_number}
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
                                    Cheq_bank
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name="cheq_bank"
                                    value={this.state.cheq_bank}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-method-input"
                                    className="form-label"
                                  >
                                    Cheq_supc_id
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name="cheq_supc_id"
                                    value={this.state.cheq_supc_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
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
