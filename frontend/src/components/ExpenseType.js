import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class ExpenseType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      extype: [],
      exptype_id: "",	
      exprtype_name: "",
     
    };
  }

  componentDidMount() {
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
      .post("http://localhost:4000/api/expenses_type", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteType = (exptype_id) => {
    axios
      .delete("http://localhost:4000/api/expenses_type/" + exptype_id)
      .then((response) => {
        if (response.data != null) {
          alert("ExpensesType deleted succesfully.");

          this.setState({
            extype: this.state.extype.filter(
              (data) => data.exptype_id !== exptype_id
            ),
          });
        }
        console.log(response);
      });
  };

  findTypeById = (exptype_id) => {
    axios
      .get("http://localhost:4000/api/expenses_type/" + exptype_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.exptype_id);
          this.setState({
            exptype_id: data.exptype_id,	
            exprtype_name: data.exprtype_name,
            
          });
        }
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/expenses_type", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  render() {
    const { exprtype_name } = this.state;

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
                      <h4 className="card-title mb-4">Expense Type List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Type
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
                              <th className="align-middle">ExpensesType ID</th>
                              <th className="align-middle">ExpensesType Name</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.extype.map((data) => {
                              return (
                                <tr key={data.exptype_id}>
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
                                  <td>{data.exptype_id}</td>
                                  <td>{data.exprtype_name}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findTypeById.bind(
                                        this,
                                        data.exptype_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>

                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteType.bind(
                                        this,
                                        data.exptype_id
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
                                <h4 className="card-title mb-6">Add Type</h4>
                                <form onSubmit={this.handleSubmit}>
                                  <div className="row">
                                    <div className="col-md-6">

                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-firstname-input"
                                          className="form-label"
                                        >
                                          Expenses Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="formrow-email-input"
                                          name="exprtype_name"
                                          value={exprtype_name}
                                          onChange={this.handleChange}
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
                              <h4 className="card-title mb-6">Update Type</h4>
                              <form onSubmit={this.handleUpdate}>
                                <div className="row">
                                  
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-unitname-input"
                                        className="form-label"
                                      >
                                        ExpensesType Name
                                      </label>

                                      <input
                                        type="text"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="exprtype_name"
                                        value={this.state.exprtype_name}
                                        onChange={this.handleChange}
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
