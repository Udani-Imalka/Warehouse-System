import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class Recode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recode: [],
      products: [],
      location: [],
      p_name: "",
      st_name: "",
      rec_id: "",
      p_id: "",
      st_id: "",
      qty: "",
      add_date: "",
      exp: "",
      mfd: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/recode").then((response) => {
      this.setState({
        recode: response.data.data,
      });
      // console.log(response.data.data);
    });

    axios.get("http://localhost:4000/api/storage").then((response) => {
      this.setState({
        location: response.data.data,
      });
      // console.log(response.data.data);
    });

    axios.get("http://localhost:4000/api/product").then((response) => {
      this.setState({
        products: response.data.data,
      });
      //console.log(response.data.data);
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
      .post("http://localhost:4000/api/recode", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:4000/api/recode", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteRecode = (rec_id) => {
    axios
      .delete("http://localhost:4000/api/recode/" + rec_id)
      .then((response) => {
        if (response.data != null) {
          alert("Recode deleted succesfully.");

          this.setState({
            recode: this.state.recode.filter((data) => data.rec_id !== rec_id),
          });
        }
        console.log(response);
      });
  };

  findRecodeById = (rec_id) => {
    axios.get("http://localhost:4000/api/recode/" + rec_id).then((response) => {
      if (response.data != null) {
        let data = response.data.data;
        console.log(data.rec_id);
        this.setState({
          rec_id: data.rec_id,
          p_id: data.p_id,
          st_id: data.st_id,
          qty: data.qty,
          add_date: data.add_date,
          exp: data.exp,
          mfd: data.mfd,
        });
      }
    });
  };

  render() {
    const { p_id, st_id, qty, add_date, exp, mfd } = this.state;

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
                      <h4 className="card-title mb-4">Recode List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Recode
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

                              <th className="align-middle">Product Name</th>
                              <th className="align-middle">Qty</th>
                              <th className="align-middle">Location Name</th>
                              <th className="align-middle">Added Date</th>
                              <th className="align-middle">Ex. Date</th>
                              <th className="align-middle">Mf. Date</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.recode.map((data) => {
                              return (
                                <tr key={data.recID}>
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

                                  <td>{data.p_name}</td>
                                  <td>{data.qty}</td>
                                  <td>{data.st_name}</td>
                                  <td>{data.add_date}</td>
                                  <td>{data.exp}</td>
                                  <td>{data.mfd}</td>
                                  <td>
                                    <button
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      class="btn btn-outline-secondary btn-sm edit"
                                      title="Edit"
                                      onClick={this.findRecodeById.bind(
                                        this,
                                        data.rec_id
                                      )}
                                    >
                                      <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteRecode.bind(
                                        this,
                                        data.rec_id
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
            </div>
          </div>
        </div>

        {/********************* Add modal  ************************/}

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
                          <h4 className="card-title mb-4">Add Recode</h4>
                          <form onSubmit={this.handleSubmit}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-firstname-input"
                                    className="form-label"
                                  >
                                    Qty
                                  </label>
                                  <input
                                    type="qty"
                                    className="form-control"
                                    id="formrow-qty-input"
                                    name="qty"
                                    value={qty}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-productId-input"
                                    className="form-label"
                                  >
                                    Product Name
                                  </label>
                                  <select
                                    id="formrow-inputProductId"
                                    className="form-select"
                                    name="p_id"
                                    value={p_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.products.map((data) => (
                                      <option key={data.p_id} value={data.p_id}>
                                        {data.p_id} {}
                                        {data.p_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-stId-input"
                                    className="form-label"
                                  >
                                    Storage Location
                                  </label>
                                  <select
                                    className="form-select"
                                    name="st_id"
                                    value={st_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.location.map((data) => (
                                      <option
                                        key={data.st_id}
                                        value={data.st_id}
                                      >
                                        {data.st_id} {}
                                        {data.st_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Added Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="add_date"
                                      value={add_date}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Ex. Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="dd M, yyyy"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="exp"
                                      value={exp}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Mf.Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="dd M, yyyy"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="mfd"
                                      value={mfd}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
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

        {/********************** End Add Modal **************/}

        {/************ update modal ************************/}
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
                          <h4 className="card-title mb-4">Add Recode</h4>
                          <form onSubmit={this.handleUpdate}>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-firstname-input"
                                    className="form-label"
                                  >
                                    Qty
                                  </label>
                                  <input
                                    type="qty"
                                    className="form-control"
                                    id="formrow-qty-input"
                                    name="qty"
                                    value={this.state.qty}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-productId-input"
                                    className="form-label"
                                  >
                                    Product Name
                                  </label>
                                  <select
                                    id="formrow-inputProductId"
                                    className="form-select"
                                    name="p_id"
                                    value={this.state.p_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.products.map((data) => (
                                      <option key={data.p_id} value={data.p_id}>
                                        {data.p_id} {}
                                        {data.p_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-stId-input"
                                    className="form-label"
                                  >
                                    Storage Location
                                  </label>
                                  <select
                                    className="form-select"
                                    name="st_id"
                                    value={st_id}
                                    onChange={this.handleChange}
                                  >
                                    <option selected>Choose</option>
                                    {this.state.location.map((data) => (
                                      <option
                                        key={data.st_id}
                                        value={data.st_id}
                                      >
                                        {data.st_id} {}
                                        {data.st_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Added Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="add_date"
                                      value={this.state.add_date}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Ex. Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="dd M, yyyy"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="exp"
                                      value={this.state.exp}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="mb-3">
                                  <label
                                    htmlFor="formrow-inputCity"
                                    className="form-label"
                                  >
                                    Mf.Date
                                  </label>
                                  <div className="input-group" id="datepicker1">
                                    <input
                                      type="date"
                                      className="form-control"
                                      placeholder="dd M, yyyy"
                                      data-date-format="dd M, yyyy"
                                      data-date-container="#datepicker1"
                                      data-provide="datepicker"
                                      name="mfd"
                                      value={this.state.mfd}
                                      onChange={this.handleChange}
                                    />
                                    <span className="input-group-text">
                                      <i className="mdi mdi-calendar" />
                                    </span>
                                  </div>
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
        {/************* end Update  modal **********************/}
      </body>
    );
  }
}
