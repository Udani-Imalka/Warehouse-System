import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: [],
      cat_id: "",
      cat_name: "",
      cat_type: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/category").then((response) => {
      this.setState({
        category: response.data.data,
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
      .post("http://localhost:4000/api/category", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteCategory = (cat_id) => {
    axios
      .delete("http://localhost:4000/api/category/" + cat_id)
      .then((response) => {
        if (response.data != null) {
          alert("Category deleted succesfully.");

          this.setState({
            category: this.state.category.filter(
              (data) => data.cat_id !== cat_id
            ),
          });
        }
        console.log(response);
      });
  };

  findCategoryById = (cat_id) => {
    axios
      .get("http://localhost:4000/api/category/" + cat_id)
      .then((response) => {
        if (response.data != null) {
          let data = response.data.data;
          console.log(data.cat_id);
          this.setState({
            cat_id: data.cat_id,
            cat_name: data.cat_name,
            cat_type: data.cat_qty,
          });
        }
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/category", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  render() {
    const { cat_name, cat_type } = this.state;

    return (
      <body data-sidebar="dark">
        <Main />

        <div className="main-content">
          <div className="page-content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title mb-4">Category List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#AddModal"
                          >
                            + Add Category
                          </button>
                        </div>
                        <div className="col-xl-2">
                          <div id="datatable_filter" class="dataTables_filter">
                            <label>
                              Search:
                              <input
                                type="search"
                                className="form-control form-control-sm"
                                placeholder=""
                                aria-controls="datatable"
                              ></input>
                            </label>
                          </div>
                        </div>
                      </div>

                      {/******************** * Table View *****************/}

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

                              <th className="align-middle">Category Name</th>
                              <th className="align-middle">Category Type</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.category.map((data) => {
                              return (
                                <tr key={data.cat_id}>
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

                                  <td>{data.cat_name}</td>
                                  <td>{data.cat_type}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findCategoryById.bind(
                                        this,
                                        data.cat_id
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
                      {/************ * end table-responsive ***********************/}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/******************** * Add modal *****************/}

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
                          <h4 className="card-title mb-4">Add Category</h4>
                          <form onSubmit={this.handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Category Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="cat_name"
                                    value={cat_name}
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
                                    Category Type
                                  </label>
                                  <select
                                    id="formrow-inputProductId"
                                    className="form-select"
                                    name="cat_type"
                                    value={cat_type}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
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

        {/******************** * end add  modal *****************/}

        {/******************** * update modal *****************/}
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
                          <h4 className="card-title mb-4">Edit Category</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-name-input"
                                    className="form-label"
                                  >
                                    Category Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-name-input"
                                    name="cat_name"
                                    value={this.state.cat_name}
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
                                    Category Type
                                  </label>
                                  <select
                                    id="formrow-inputProductId"
                                    className="form-select"
                                    name="cat_type"
                                    value={this.state.cat_type}
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
