import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Expenses extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expense: [],
      extype: [],
      exprtype_name: "",
      exp_id: "",
      exp_refNumber: "",
      exp_refAmount: "",
      exptype_id: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/expenses").then((response) => {
      this.setState({
        expense: response.data.data,
      });
      console.log(response.data.data);
    });

    axios.get("http://localhost:4000/api/expenses_type").then((response) => {
      this.setState({
        extype: response.data.data,
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
      .post("http://localhost:4000/api/expenses", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteExp = (exp_id) => {
    axios
      .delete("http://localhost:4000/api/expenses/" + exp_id)
      .then((response) => {
        if (response.data != null) {
          alert("Expenses deleted succesfully.");

          this.setState({
            expense: this.state.expense.filter(
              (data) => data.exp_id !== exp_id
            ),
          });
        }
        console.log(response);
      });
  };

  findExpById = (exp_id) => {
    axios
      .get("http://localhost:4000/api/expenses/" + exp_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.exp_id);
          this.setState({
            exp_refNumber: data.exp_refNumber,
            exp_refAmount: data.exp_refAmount,
            exptype_id: data.exptype_id,
          });
        }
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/expenses", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  render() {
    const { exp_refNumber, exp_refAmount, exptype_id } = this.state;

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
                      <h4 className="card-title mb-4">Expenses List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Expenses
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

                      {/**************************** * Table view *****************************/}

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
                              <th className="align-middle">exp_refNumber</th>
                              <th className="align-middle">exp_refAmount</th>
                              <th className="align-middle">expType Name</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.expense.map((data) => {
                              return (
                                <tr key={data.exp_id}>
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
                                  <td>{data.exp_refNumber}</td>
                                  <td>{data.exp_refAmount}</td>
                                  <td>{data.exprtype_name}</td>
                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findExpById.bind(
                                        this,
                                        data.exp_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>

                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteExp.bind(
                                        this,
                                        data.exp_id
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

                      {/*******************************  end table-responsive ****************************/}
                    </div>
                  </div>
                </div>
              </div>

              {/* ***************************  Add Modal *************************/}

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
                                  Add Expenses
                                </h4>
                                <form onSubmit={this.handleSubmit}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-unitname-input"
                                          className="form-label"
                                        >
                                          exp_refNumber
                                        </label>

                                        <input
                                          type="text"
                                          className="form-control"
                                          id="formrow-email-input"
                                          name="exp_refNumber"
                                          value={exp_refNumber}
                                          onChange={this.handleChange}
                                        />
                                      </div>

                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-firstname-input"
                                          className="form-label"
                                        >
                                          exp_refAmount
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="formrow-email-input"
                                          name="exp_refAmount"
                                          value={exp_refAmount}
                                          onChange={this.handleChange}
                                        />
                                      </div>

                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-firstname-input"
                                          className="form-label"
                                        >
                                          expType Name
                                        </label>
                                        <select
                                          id="formrow-inputCategoryId"
                                          className="form-select"
                                          name="exptype_id"
                                          value={exptype_id}
                                          onChange={this.handleChange}
                                        >
                                          <option selected>Choose</option>
                                          {this.state.extype.map((data) => (
                                            <option
                                              key={data.exptype_id}
                                              value={data.exptype_id}
                                            >
                                              {data.exptype_id} {}
                                              {data.exprtype_name}
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

              {/***************************** * Update Modal *************************/}

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
                              <h4 className="card-title mb-6">
                                Update Expenses
                              </h4>
                              <form onSubmit={this.handleUpdate}>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-unitname-input"
                                        className="form-label"
                                      >
                                        exp_refNumber
                                      </label>

                                      <input
                                        type="text"
                                        className="form-control"
                                        name="exp_refNumber"
                                        value={this.state.exp_refNumber}
                                        onChange={this.handleChange}
                                      />
                                    </div>

                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-firstname-input"
                                        className="form-label"
                                      >
                                        exp_refAmount
                                      </label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="exp_refAmount"
                                        value={this.state.exp_refAmount}
                                        onChange={this.handleChange}
                                      />
                                    </div>

                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-firstname-input"
                                        className="form-label"
                                      >
                                        expType Name
                                      </label>
                                      <select
                                        id="formrow-inputCategoryId"
                                        className="form-select"
                                        name="exptype_id"
                                        value={this.state.exptype_id}
                                        onChange={this.handleChange}
                                      >
                                        <option selected>Choose</option>
                                        {this.state.extype.map((data) => (
                                          <option
                                            key={data.exptype_id}
                                            value={data.exptype_id}
                                          >
                                            {data.exptype_id} {}
                                            {data.exprtype_name}
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
                                    value="update"
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

              {/******************* * end Update Modal ************************/}
            </div>
          </div>
        </div>
      </body>
    );
  }
}
