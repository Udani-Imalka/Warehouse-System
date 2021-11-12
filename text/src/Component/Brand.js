import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Brand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      brands: [],
      brand_id: "",
      brand_num: "",
      brand_name: "",
      brand_type: "",
      brand_image: "",
      brand_isActive: "",
      brand_addedDate: "",
    };
  }

  componentDidMount = async () => {
    await axios.get("http://localhost:4000/api/brands").then((response) => {
      this.setState({
        brands: response.data.data,
      });
      console.log(response.data.data);
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/brands", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/brands", this.state)
      .then(response => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteBrand = (brand_id) => {
    axios
      .delete("http://localhost:4000/api/brands/" + brand_id)
      .then((response) => {
        if (response.data != null) {
          alert("Brand deleted succesfully.");

          this.setState({
            brands: this.state.brands.filter(
              (data) => data.brand_id !== brand_id
            ),
          });
        }
        console.log(response);
      });
  };

  findBrandById = (brand_id) => {
    axios
      .get("http://localhost:4000/api/brands/" + brand_id)
      .then(response => {
        if (response.data!= null) {
          
          let data = response.data.data;
          console.log(data.brand_id);
          this.setState({
            brand_id: data.brand_id,
            brand_num: data.brand_num,
            brand_name: data.brand_name,
            brand_type: data.brand_type,
            brand_image: data.brand_image,
            brand_isActive: data.brand_isActive,
            brand_addedDate: data.brand_addedDate,
          });
        }
        
      });
  };

  render() {
    const {
      brand_name,
      brand_num,
      brand_type,
      brand_image,
      brand_isActive,
      brand_addedDate,
    } = this.state;

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
                      <h4 className="card-title mb-4">Brand List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Brand
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
                                <div className="modal-body">
                                  <div className="row">
                                    <div className="col-xl-12">
                                      <div className="card">
                                        <div className="card-body">
                                          <h4 className="card-title mb-4">
                                            Add Brand
                                          </h4>
                                          <form onSubmit={this.handleSubmit}>
                                            <div className="mb-6">
                                              <label
                                                htmlFor="formrow-email-input"
                                                className="form-label"
                                              >
                                                Brand Name
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control"
                                                id="formrow-name-input"
                                                name="brand_name"
                                                value={brand_name}
                                                onChange={this.handleChange}
                                              />
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-firstname-input"
                                                    className="form-label"
                                                  >
                                                    Availability
                                                  </label>
                                                  <select
                                                    id="formrow-availability"
                                                    className="form-select"
                                                    name="brand_isActive"
                                                    value={brand_isActive}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    <option>pending</option>
                                                    <option>confirm</option>
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-password-input"
                                                    className="form-label"
                                                  >
                                                    Brand type
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-type-input"
                                                    name="brand_type"
                                                    value={brand_type}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-firstname-input"
                                                    className="form-label"
                                                  >
                                                    Brand Number
                                                  </label>
                                                  <select
                                                    id="formrow-num"
                                                    className="form-select"
                                                    name="brand_num"
                                                    value={brand_num}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    <option>no_1</option>
                                                    <option>no_2</option>
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-md-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-password-input"
                                                    className="form-label"
                                                  >
                                                    Brand Added Date
                                                  </label>
                                                  <input
                                                    type="date"
                                                    className="form-control"
                                                    id="formrow-date-input"
                                                    name="brand_addedDate"
                                                    value={brand_addedDate}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div>
                                                <label
                                                  htmlFor="formrow-inputZip"
                                                  className="form-label"
                                                >
                                                  Brand Image
                                                </label>

                                                <div className="text-center mt-6">
                                                  <form
                                                    action="#"
                                                    className="dropzone"
                                                  >
                                                    <br></br>
                                                    <br></br>
                                                    <br></br>
                                                    <div className="fallback">
                                                      <input
                                                        name="brand_image"
                                                        type="file"
                                                        multiple="multiple"
                                                        value={brand_image}
                                                        onChange={
                                                          this.handleChange
                                                        }
                                                      />
                                                    </div>
                                                    <div className="dz-message needsclick">
                                                      <div className="mb-3">
                                                        <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                      </div>
                                                      <h5>
                                                        Drop files here or click
                                                        to upload.
                                                      </h5>
                                                    </div>
                                                  </form>
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
                              <th className="align-middle">Brand Name</th>
                              <th className="align-middle">Brand Number</th>
                              <th className="align-middle"> Brand Image</th>
                              <th className="align-middle"> Brand Type</th>
                              <th className="align-middle">Availability</th>
                              <th className="align-middle">Added Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.brands.map((data) => {
                              return (
                                <tr key={data.brand_id}>
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
                                  <td>{data.brand_name}</td>
                                  <td>{data.brand_num}</td>
                                  <td>{data.brand_image}</td>
                                  <td>{data.brand_type}</td>
                                  <td>{data.brand_isActive}</td>
                                  <td>{data.brand_addedDate}</td>

                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findBrandById.bind(this,data.brand_id)}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
{/* update modal */}
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
                                                    <h4 className="card-title mb-4">
                                                      Edit Brand
                                                    </h4>
                                                    <form
                                                      onSubmit={
                                                        this.handleUpdate
                                                      }
                                                    >
                                                      

                                                      <div className="mb-6">
                                                        <label
                                                          htmlFor="formrow-email-input"
                                                          className="form-label"
                                                        >
                                                          Brand Name
                                                        </label>
                                                        <input
                                                          type="text"
                                                          className="form-control"
                                                          id="formrow-name-input"
                                                          name="brand_name"
                                                          value={this.state.brand_name}
                                                          onChange={
                                                            this.handleChange
                                                          }
                                                          
                                                        />
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <div className="mb-3">
                                                            <label
                                                              htmlFor="formrow-firstname-input"
                                                              className="form-label"
                                                            >
                                                              Availability
                                                            </label>
                                                            <select
                                                              id="formrow-availability"
                                                              className="form-select"
                                                              name="brand_isActive"
                                                              value={
                                                                this.state.brand_isActive
                                                              }
                                                              onChange={
                                                                this
                                                                  .handleChange
                                                              }
                                                            >
                                                              <option value="" >
                                                                Choose
                                                              </option>
                                                              <option value="pending">
                                                                pending
                                                              </option>
                                                              <option value="confirm">
                                                                confirm
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <div className="mb-3">
                                                            <label
                                                              htmlFor="formrow-password-input"
                                                              className="form-label"
                                                            >
                                                              Brand type
                                                            </label>
                                                            <input
                                                              type="text"
                                                              className="form-control"
                                                              id="formrow-type-input"
                                                              name="brand_type"
                                                              value={this.state.brand_type}
                                                              onChange={
                                                                this
                                                                  .handleChange
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          <div className="mb-3">
                                                            <label
                                                              htmlFor="formrow-firstname-input"
                                                              className="form-label"
                                                            >
                                                              Brand Number
                                                            </label>
                                                            <select
                                                              id="formrow-num"
                                                              className="form-select"
                                                              name="brand_num"
                                                              value={this.state.brand_num}
                                                              onChange={
                                                                this
                                                                  .handleChange
                                                              }
                                                            >
                                                              <option >
                                                                Choose
                                                              </option>
                                                              <option value="no_1">
                                                                no_1
                                                              </option>
                                                              <option value="no_2">
                                                                no_2
                                                              </option>
                                                            </select>
                                                          </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                          <div className="mb-3">
                                                            <label
                                                              htmlFor="formrow-password-input"
                                                              className="form-label"
                                                            >
                                                              Brand Added Date
                                                            </label>
                                                            <input
                                                              type="date"
                                                              className="form-control"
                                                              id="formrow-date-input"
                                                              name="brand_addedDate"
                                                              value={
                                                                this.state.brand_addedDate
                                                              }
                                                              onChange={
                                                                this
                                                                  .handleChange
                                                              }
                                                            />
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div>
                                                          <label
                                                            htmlFor="formrow-inputZip"
                                                            className="form-label"
                                                          >
                                                            Brand Image
                                                          </label>

                                                          <div className="text-center mt-6">
                                                            <form
                                                              action="#"
                                                              className="dropzone"
                                                            >
                                                              <br></br>
                                                              <br></br>
                                                              <br></br>
                                                              <div className="fallback">
                                                                <input
                                                                  name="brand_image"
                                                                  type="file"
                                                                  multiple="multiple"
                                                                  value={
                                                                    this.state.brand_image
                                                                  }
                                                                  onChange={
                                                                    this
                                                                      .handleChange
                                                                  }
                                                                />
                                                              </div>
                                                              <div className="dz-message needsclick">
                                                                <div className="mb-3">
                                                                  <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                                </div>
                                                                <h5>
                                                                  Drop files
                                                                  here or click
                                                                  to upload.
                                                                </h5>
                                                              </div>
                                                            </form>
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

                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteBrand.bind(
                                        this,
                                        data.brand_id
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
      </body>
    );
  }
}
