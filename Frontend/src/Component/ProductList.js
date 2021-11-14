import React, { Component } from "react";
import axios from "axios";
import Main from "./Main";

export default class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      brands: [],
      category: [],
      variation: [],
      units: [],
      p_name: "",
      pvar_name: "",
      brand_name: "",
      cat_name: "",
      punit_name: "",
      p_barcode: "",
      p_qty: "",
      p_unit_qty: "",
      p_buyingPrice: "",
      p_sellingPrice: "",
      p_unitPrice: "",
      p_unitValue: "",
      p_image: "",
      p_isActive: "",
      p_addedDate: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:4000/api/product").then((response) => {
      this.setState({
        products: response.data.data,
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
      .post("http://localhost:4000/api/product", this.state)
      .then((response) => {
        console.log(response.data);
        this.componentDidMount();
      });
  };

  deleteProduct = (productID) => {
    axios
      .delete("http://localhost:4000/api/product/" + productID)
      .then((response) => {
        if (response.data != null) {
          alert("Product deleted succesfully.");

          this.setState({
            products: this.state.products.filter(
              (data) => data.productID !== productID
            ),
          });
        }
        console.log(response);
      });
  };

  render() {
    const {
      p_name,
      pvar_name,
      brand_name,
      cat_name,
      punit_name,
      p_barcode,
      p_qty,
      p_unit_qty,
      p_buyingPrice,
      p_sellingPrice,
      p_unitPrice,
      p_unitValue,
      p_image,
      p_isActive,
      p_addedDate,
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
                      <h4 className="card-title mb-4">Product List</h4>

                      <div className="row">
                        <div className="col-xl-10">
                          <button
                            type="button"
                            className="btn btn-success waves-effect waves-light"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModalFullscreen"
                          >
                            + Add Product
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
                                          <h4 className="card-title mb-4">
                                            Add Product
                                          </h4>
                                          <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-email-input"
                                                    className="form-label"
                                                  >
                                                    Product Name
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    name="p_name"
                                                    value={p_name}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-email-input"
                                                    className="form-label"
                                                  >
                                                    Product Variation
                                                  </label>
                                                  <select
                                                    id="formrow-inputCategoryId"
                                                    className="form-select"
                                                    name="pvar_name"
                                                    value={pvar_name}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    {this.state.variation.map((data) => <option key = {data.pvar_id} >{data.pvar_name}</option>)}
                                                    
                                                    
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="row">
                                              <div className="col-lg-10">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-password-input"
                                                    className="form-label"
                                                  >
                                                    Category Name
                                                  </label>
                                                  <select
                                                    id="formrow-inputCategoryId"
                                                    className="form-select"
                                                    name="cat_name"
                                                    value={cat_name}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    {this.state.category.map((data) => <option key = {data.cat_id} >{data.cat_name}</option>)}
                                                  </select>
                                                  {/* <button type="button" className="btn btn-primary waves-effect waves-light" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen">+</button> */}
                                                </div>
                                              </div>
                                              <div className="col-lg-1">
                                                <div className="mb-2">
                                                  <div className="mb-2">
                                                    <label
                                                      htmlFor="formrow-password-input"
                                                      className="form-label"
                                                    ></label>
                                                  </div>
                                                  <button
                                                    type="button"
                                                    className="btn btn-primary waves-effect waves-light"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#exampleModalFullscreen1"
                                                  >
                                                    +
                                                  </button>
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
                                                    Brand Name
                                                  </label>
                                                  <select
                                                    type="text"
                                                    className="form-select"
                                                    name="brand_name"
                                                    value={brand_name}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose
                                                    </option>
                                                    {this.state.brands.map((data) => <option key = {data.brand_id} >{data.brand_name}</option>)}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-6">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputState"
                                                    className="form-label"
                                                  >
                                                    Unit Name
                                                  </label>
                                                  <select
                                                    id="formrow-inputState"
                                                    className="form-select"
                                                    name="punit_name"
                                                    value={punit_name}
                                                    onChange={this.handleChange}
                                                  >
                                                    <option selected>
                                                      Choose...
                                                    </option>
                                                    {this.state.units.map((data) => <option key = {data.punit_id} >{data.punit_name}</option>)}
                                                  </select>
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Buy Price
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_buyingPrice"
                                                    value={p_buyingPrice}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Sell Price
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_sellingPrice"
                                                    value={p_sellingPrice}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Quantity
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_qty"
                                                    value={p_qty}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Unit qty
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_unit_qty"
                                                    value={p_unit_qty}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Unit Price
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_unitPrice"
                                                    value={p_unitPrice}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Unit Value
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_unitValue"
                                                    value={p_unitValue}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>

                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    isActive
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_isActive"
                                                    value={p_isActive}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Bar Code
                                                  </label>
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_barcode"
                                                    value={p_barcode}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>
                                              <div className="col-lg-4">
                                                <div className="mb-3">
                                                  <label
                                                    htmlFor="formrow-inputZip"
                                                    className="form-label"
                                                  >
                                                    Added Date
                                                  </label>
                                                  <input
                                                    type="Date"
                                                    className="form-control"
                                                    id="formrow-inputZip"
                                                    name="p_addedDate"
                                                    value={p_addedDate}
                                                    onChange={this.handleChange}
                                                  />
                                                </div>
                                              </div>

                                              <div>
                                                <label
                                                  htmlFor="formrow-inputZip"
                                                  className="form-label"
                                                >
                                                  Image
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
                                                        name="p_image"
                                                        type="file"
                                                        multiple="multiple"
                                                        value={p_image}
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

                              <th className="align-middle">Product Name</th>
                              <th className="align-middle">Image</th>
                              <th className="align-middle">Buy Price</th>
                              <th className="align-middle">Sell Price</th>
                              <th className="align-middle">Qty</th>
                              <th className="align-middle">Bar Code</th>
                              <th className="align-middle">Unit_qty</th>
                              <th className="align-middle">Unit_price</th>
                              <th className="align-middle">Unit_value</th>
                              <th className="align-middle">Brand Name</th>
                              <th className="align-middle">Cat. Name</th>
                              <th className="align-middle">unit Name</th>
                              <th className="align-middle">Action</th>
                              <th className="align-middle">
                                Product Variation
                              </th>
                              <th className="align-middle">Added Date</th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.products.map((data) => {
                              return (
                                <tr key={data.p_id}>
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
                                  <td>{data.p_image}</td>
                                  <td>{data.p_buyingPrice}</td>
                                  <td>{data.p_sellingPrice}</td>
                                  <td>{data.p_qty}</td>
                                  <td>{data.p_barcode}</td>
                                  <td>{data.p_unit_qty}</td>
                                  <td>{data.p_unitPrice}</td>
                                  <td>{data.p_unitValue}</td>
                                  <td>{data.brand_name}</td>
                                  <td>{data.cat_name}</td>
                                  <td>{data.punit_name}</td>
                                  <td>{data.pvar_name}</td>
                                  <td>{data.p_addedDate}</td>
                                  <td>
                                    {/* Button trigger modal */}
                                    <button
                                      type="button"
                                      className="btn btn-outline-primary btn-sm btn-rounded waves-effect waves-light"
                                      data-bs-toggle="modal"
                                      data-bs-target=".transaction-detailModal"
                                    >
                                      View Details
                                    </button>
                                  </td>
                                  <td>
                                    <a
                                      href="/"
                                      className="btn btn-outline-secondary btn-sm edit"
                                    >
                                      <i className="fas fa-pencil-alt" />
                                    </a>
                                    <button
                                      className="btn btn-outline-secondary btn-sm delete"
                                      onClick={this.deleteProduct.bind(
                                        this,
                                        data.productID
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
              <div
                className="modal fade transaction-detailModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="transaction-detailModalLabel"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5
                        className="modal-title"
                        id="transaction-detailModalLabel"
                      >
                        Product Details
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <p className="mb-2">
                        Product Id: <span className="text-primary">P1</span>
                      </p>
                      <p className="mb-4">
                        Product Name:{" "}
                        <span className="text-primary">100g Mari Biscuit</span>
                      </p>
                      <div className="table-responsive">
                        <table className="table align-middle table-nowrap">
                          <thead>
                            <tr>
                              <th scope="col">Product</th>
                              <th scope="col">Product Name</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">
                                <div>
                                  <img
                                    src="assets/images/product/mari.jpeg"
                                    alt=""
                                    className="avatar-lg"
                                  />
                                </div>
                              </th>
                              <td>
                                <div>
                                  <h5 className="text-truncate font-size-14">
                                    Mari Biscuit
                                  </h5>
                                  <p className="text-muted mb-0">
                                    Rs.60.00 x 5
                                  </p>
                                </div>
                              </td>
                              <td>Rs.60.00</td>
                            </tr>
                            {/* <tr>
                        <th scope="row">
                          <div>
                            <img src="assets/images/product/img-4.png" alt="" className="avatar-sm" />
                          </div>
                        </th>
                        <td>
                          <div>
                            <h5 className="text-truncate font-size-14">Phone patterned cases</h5>
                            <p className="text-muted mb-0">$ 145 x 1</p>
                          </div>
                        </td>
                        <td>$ 145</td>
                      </tr>
                       */}
                            <tr>
                              <td colSpan={2}>
                                <h6 className="m-0 text-right">Sub Total:</h6>
                              </td>
                              <td>Rs. 300.00</td>
                            </tr>
                            {/* <tr>
                        <td colSpan={2}>
                          <h6 className="m-0 text-right">Shipping:</h6>
                        </td>
                        <td>
                          Free
                        </td>
                      </tr> */}
                            <tr>
                              <td colSpan={2}>
                                <h6 className="m-0 text-right">Total:</h6>
                              </td>
                              <td>Rs. 300.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* end modal */}
            </div>
          </div>
        </div>
      </body>
    );
  }
}
