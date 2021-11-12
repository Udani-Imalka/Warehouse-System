import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class StoreLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      st_id: "",
      st_name: "",
      st_location: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/storage").then((response) => {
      this.setState({
        location: response.data.data,
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
      .post("http://localhost:4000/api/storage", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/storage", this.state)
      .then(response => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteStorage = (st_id) => {
    axios
      .delete("http://localhost:4000/api/storage/" + st_id)
      .then((response) => {
        if (response.data != null) {
          alert("Storage Location deleted succesfully.");

          this.setState({
            location: this.state.location.filter(
              (data) => data.st_id !== st_id
            ),
          });
        }
        console.log(response);
      });
  };

  findStorageById = (st_id) => {
    axios.get("http://localhost:4000/api/storage/" + st_id).then((response) => {
      if (response.data != null) {
        let data = response.data.data;
        console.log(data.st_id);
        this.setState({
          st_id: data.st_id,
          st_name: data.st_name,
          st_location: data.st_location,
        });
      }
    });
  };

  render() {
    const { st_name, st_location } = this.state;

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
                      <h4 className="card-title mb-4">Location List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Location
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
                                            Add Loaction
                                          </h4>
                                          <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                              <div className="col-md-6">
                                                <div className="mb-6">
                                                  <label
                                                    htmlFor="formrow-name-input"
                                                    className="form-label"
                                                  >
                                                    store Name
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-name-input"
                                                    name="st_name"
                                                    value={st_name}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-location-input"
                                                    className="form-label"
                                                  >
                                                    Storeage Location
                                                  </label>
                                                  <select
                                                    id="formrow-inputLocation"
                                                    className="form-select"
                                                    name="st_location"
                                                    value={st_location}
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
                              <th className="align-middle">Storage Name</th>
                              <th className="align-middle">Storage Location</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.location.map((data) => {
                              return (
                                <tr key={data.st_id}>
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
                                  <td>{data.st_name}</td>
                                  <td>{data.st_location}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findStorageById.bind(
                                        this,
                                        data.st_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteStorage.bind(
                                        this,
                                        data.st_id
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
                          <h4 className="card-title mb-6">Update Loaction</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-6">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    store Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="st_name"
                                    value={this.state.st_name}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-location-input"
                                    className="form-label"
                                  >
                                    Storeage Location
                                  </label>
                                  <select
                                    id="formrow-inputLocation"
                                    className="form-select"
                                    name="st_location"
                                    value={this.state.st_location}
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
