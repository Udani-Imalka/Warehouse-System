import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class ProductVariation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      variation: [],
      pvar_id: "",
      pvar_name: "",
      pvar_type: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/productVariation").then((response) => {
      this.setState({
        variation: response.data.data,
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
      .post("http://localhost:4000/api/productVariation", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteCategory = (pvar_id) => {
    axios
      .delete("http://localhost:4000/api/productVariation/" + pvar_id)
      .then((response) => {
        if (response.data != null) {
          alert("Variation deleted succesfully.");

          this.setState({
            variation: this.state.variation.filter(
              (data) => data.pvar_id !== pvar_id
            ),
          });
        }
        console.log(response);
      });
  };

  findVariationById = (pvar_id) => {
    axios
      .get("http://localhost:4000/api/productVariation/" + pvar_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.pvar_id);
          this.setState({
            pvar_id: data.pvar_id,
            pvar_name: data.pvar_name,
            pvar_type: data.pvar_type,
          });
        }
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/productVariation", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  render() {
    const { pvar_name, pvar_type } = this.state;

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
                      <h4 className="card-title mb-4">Product Variation List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen1"
                          >
                            + Add Variation
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
                            id="exampleModalFullscreen1"
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
                                          <h4 className="card-title mb-4">
                                            Add Variation
                                          </h4>
                                          <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-name-input"
                                                    className="form-label"
                                                  >
                                                    Product Variation
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-name-input"
                                                    name="pvar_name"
                                                    value={pvar_name}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-type-input"
                                                    className="form-label"
                                                  >
                                                    Variation Type
                                                  </label>
                                                  <select
                                                    id="formrow-inputProductId"
                                                    className="form-select"
                                                    name="pvar_type"
                                                    value={pvar_type}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    <option>type1</option>
                                                    <option>type2</option>
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

                              <th className="align-middle">Variation Name</th>
                              <th className="align-middle">Variation Type</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.variation.map((data) => {
                              return (
                                <tr key={data.pvar_id}>
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

                                  <td>{data.pvar_name}</td>
                                  <td>{data.pvar_type}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findVariationById.bind(
                                        this,
                                        data.pvar_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteCategory.bind(
                                        this,
                                        data.cat_id
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
                          <h4 className="card-title mb-4">Edit Variation</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Variation Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="pvar_name"
                                    value={this.state.pvar_name}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-type-input"
                                    className="form-label"
                                  >
                                    Variation Type
                                  </label>
                                  <select
                                    id="formrow-inputProductId"
                                    className="form-select"
                                    name="pvar_type"
                                    value={this.state.pvar_type}
                                    onChange={this.handleChange}
                                  >
                                    <option>type1</option>
                                    <option>type2</option>
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
