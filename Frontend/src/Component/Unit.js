import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Unit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      units: [],
      punit_id: "",
      punit_name: "",
      punit_qty: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/units").then((response) => {
      this.setState({
        units: response.data.data,
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
      .post("http://localhost:4000/api/units", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteUnit = (punit_id) => {
    axios
      .delete("http://localhost:4000/api/units/" + punit_id)
      .then((response) => {
        if (response.data != null) {
          alert("Unit deleted succesfully.");

          this.setState({
            units: this.state.units.filter(
              (data) => data.punit_id !== punit_id
            ),
          });
        }
        console.log(response);
      });
  };

  findUnitById = (punit_id) => {
    axios
      .get("http://localhost:4000/api/units/" + punit_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.punit_id);
          this.setState({
            punit_id: data.punit_id,
            punit_name: data.punit_name,
            punit_qty: data.punit_qty,
          });
        }
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/units", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  render() {
    const { punit_name, punit_qty } = this.state;

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
                      <h4 className="card-title mb-4">Unit List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Unit
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
                              <th className="align-middle">Unit Name</th>
                              <th className="align-middle">Unit qty</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.units.map((data) => {
                              return (
                                <tr key={data.punit_id}>
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
                                  <td>{data.punit_name}</td>
                                  <td>{data.punit_qty}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findUnitById.bind(
                                        this,
                                        data.punit_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>

                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteUnit.bind(
                                        this,
                                        data.unitID
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
                                <h4 className="card-title mb-6">Add Unit</h4>
                                <form onSubmit={this.handleSubmit}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-unitname-input"
                                          className="form-label"
                                        >
                                          Unit Name
                                        </label>

                                        <select
                                          id="formrow-inputProductId"
                                          className="form-select"
                                          name="punit_name"
                                          value={punit_name}
                                          onChange={this.handleChange}
                                        >
                                          <option>L</option>
                                          <option>ml</option>
                                          <option>kg</option>
                                          <option>g</option>
                                          <option>bundle</option>
                                        </select>
                                      </div>

                                      <div className="mb-3">
                                        <label
                                          htmlFor="formrow-firstname-input"
                                          className="form-label"
                                        >
                                          Unit qty
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          id="formrow-email-input"
                                          name="punit_qty"
                                          value={punit_qty}
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
                              <h4 className="card-title mb-6">Update Unit</h4>
                              <form onSubmit={this.handleUpdate}>
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-password-input"
                                        className="form-label"
                                      >
                                        Unit Name
                                      </label>
                                      <select
                                        id="formrow-inputProductId"
                                        className="form-select"
                                        name="punit_name"
                                        value={this.state.punit_name}
                                        onChange={this.handleChange}
                                      >
                                        <option>L</option>
                                        <option>ml</option>
                                        <option>kg</option>
                                        <option>g</option>
                                        <option>bundle</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div className="col-md-6">
                                    <div className="mb-3">
                                      <label
                                        htmlFor="formrow-unitname-input"
                                        className="form-label"
                                      >
                                        Unit qty
                                      </label>

                                      <input
                                        type="text"
                                        className="form-control"
                                        id="formrow-email-input"
                                        name="punit_qty"
                                        value={this.state.punit_qty}
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
