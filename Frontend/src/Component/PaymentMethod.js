import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class PayemntMethod extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: [],
      paym_id:	 "",
      paym_name: "",
      paym_type: "",
    };
  }

  componentDidMount() {
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
      .post("http://localhost:4000/api/payMethod", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/payMethod", this.state)
      .then(response => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteMethod = (paym_id) => {
    axios
      .delete("http://localhost:4000/api/payMethod/" + paym_id)
      .then((response) => {
        if (response.data != null) {
          alert("Payment Method deleted succesfully.");

          this.setState({
            method: this.state.method.filter(
              (data) => data.paym_id !== paym_id
            ),
          });
        }
        console.log(response);
      });
  };

  findMethodById = (paym_id) => {
    axios.get("http://localhost:4000/api/payMethod/" + paym_id).then((response) => {
      if (response.data != null) {
        let data = response.data.data;
        console.log(data.paym_id);
        this.setState({
          paym_id: data.paym_id,
          paym_name: data.paym_name,
          paym_type: data.paym_type,
        });
      }
    });
  };

  render() {
    const { paym_name, paym_type } = this.state;

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
                      <h4 className="card-title mb-4">Payment Method</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Payment Method
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
                                          <h4 className="card-title mb-6">
                                            Add Payment Method
                                          </h4>
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
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-name-input"
                                                    name="paym_name"
                                                    value={paym_name}
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
                                                      Payment Method Type
                                                  </label>
                                                  <select
                                                    id="formrow-inputLocation"
                                                    className="form-select"
                                                    name="paym_type"
                                                    value={paym_type}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
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
                              <th className="align-middle">Payment Method Name</th>
                              <th className="align-middle">Payment Method Type</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.method.map((data) => {
                              return (
                                <tr key={data.paym_id}>
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
                                  <td>{data.paym_type}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findMethodById.bind(
                                        this,
                                        data.paym_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteMethod.bind(
                                        this,
                                        data.paym_id
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

        {/* update modal */}
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
                                    Payment Method Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="paym_name"
                                    value={this.state.paym_name}
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
                                    Payment Method Type
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name=""
                                    value={this.state.paym_type}
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