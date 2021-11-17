import { Component } from "react";
import axios from "axios";
import Dashboard from "../Dashboard";
import { Link } from "react-router-dom";

class POCart extends Component{

  constructor(props) {
    super(props)
  
    this.state = { 
      poc_id : '',
      poc_p_id : '',
      poc_purorder_id : '',
      poc_qty : '',
      poc_buyingPrice : '',
      poc_totalValue : '',
      poc_isActive : '',
      poc_addedDate : '',   
      ordercart : [],
      orders : []
    }
  }
  
componentDidMount(){    
    axios.get('http://localhost:3030/warehouse/poc')
    .then(res => {
        this.setState({
            ordercart : res.data.data
        })
        console.log(res.data);
    })

    axios.get('http://localhost:3030/warehouse/porders')
    .then(res => {
        this.setState({
            orders : res.data.data
        })
        console.log(res.data);
    })
}

//Handle the change if we change the value in input field in add form and update form
handleChange = (event) => {
  this.setState({
    [event.target.name] : event.target.value
  })
}


  //get user by id to do the update
  getPOcartById = (id, event) => {
    axios.get('http://localhost:3030/warehouse/poc/'+id)

    .then(res => {
      if(res.data != null){
        let data = res.data.data;
        this.setState(
        {
          poc_id : data.poc_id,
          poc_p_id : data.poc_p_id,
          poc_purorder_id : data.poc_purorder_id,
          poc_qty : data.poc_qty,
          poc_buyingPrice : data.poc_buyingPrice,
          poc_totalValue : data.poc_totalValue,
          poc_isActive : data.poc_isActive,
          poc_addedDate : data.poc_addedDate,   
        }
        )}    
      })
  }

//update an existing user
handleUpdatePOcart = (event) => {
    
  event.preventDefault()
  axios.put('http://localhost:3030/warehouse/poc', this.state)
  .then(res => {
    console.log(res.data);
    this.componentDidMount();
  })
}



//add a new user to the system
handleAddPOcart = (event) => {
  event.preventDefault()
  axios.post('http://localhost:3030/warehouse/poc', this.state)
  .then(res => {
      console.log(res.data);
      this.componentDidMount();
  })  
} 

//delete a user
handleDeletePOcart = (id) => {

  axios.delete("http://localhost:3030/warehouse/poc/"+id)
  .then(res => {
    if(res.data != null){
      alert("Deleted successfully");
      this.setState({
        ordercart : this.state.ordercart.filter(data => data.poc_id !== id)
      })
    }
    console.log(res);
  })
}



render(){
return(
  <body data-sidebar="dark">
    <Dashboard/>
    <div class="main-content">
    <div class="page-content">

      <div className="container-fluid">

      <div className="row">
        <div className="col-12">
          <div className="card overflow-scroll">
            <div className="card-body">
              <h4 className="card-title text-center my-4">Purchase Order Cart</h4>

              <div className="row">
                  <div className="col-10">
                      <input type="text" className="form-control rounded w-50" placeholder="Search..."/>
                  </div>
                  
                  <div className="col-2 float-right">
                      <button class="btn btn-primary waves-effect waves-light mb-3" data-bs-toggle="modal" data-bs-target="#myAddModal">Add Purchase</button>
                  </div>    
              </div> 

              <table className="table table-nowrap align-middle">
                  <thead>
                    <tr>
                      <th>PO Cart ID</th>  
                      <th>Purchase Order ID</th>
                      <th>Product</th>
                      <th>Buy Price</th>
                      <th>Qty</th>
                      <th>Total value</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>

                  {this.state.ordercart.map(data => {
                  return( 

                    <tr data-id={data.poc_id}>
                      
                      <td data-field="id">{data.poc_id}</td>
                      <td data-field="POid">{data.poc_purorder_id}</td>
                      <td data-field="Pid">{data.poc_p_id}</td>
                      <td data-field="buyprice">{data.poc_buyingPrice}</td>
                      <td data-field="qty">{data.poc_qty}</td>
                      <td data-field="total">{data.poc_totalValue}</td>
                      <td data-field="date">{new Date(data.poc_addedDate).toLocaleDateString('en-GB')}</td>
                      <td data-field="status">{data.poc_isActive}</td>
                      <td>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Edit" data-bs-toggle="modal" data-bs-target="#myUpdateModal" onClick={this.getPOcartById.bind(this, data.poc_id)}>
                          <i className="fas fa-pencil-alt" />
                        </button>
                        <button className="btn btn-outline-secondary btn-sm mx-1" title="Delete" onClick={this.handleDeletePOcart.bind(this, data.poc_id)}>
                          <i class="fa fa-trash" aria-hidden="true"/>
                        </button>
                      </td>
                    </tr>
                    )})}
        
                  </tbody>
                </table>

              </div>
            </div>
          
          </div>
      </div>


      
{/* Add PO cart modal */}

  <div id="myAddModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
      <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title" id="myModalLabel">Add Purchase Order Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
          <h6>*All the fields are required</h6>

          <div className="card mt-3">
                  
              <form onSubmit={this.handleAddPOcart}>
                  
                  <div className="row">
                    <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-poid-input" className="form-label">PO ID</label>
                            <select id="formrow-poid" className="form-select" name="poc_purorder_id" onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              {this.state.orders.map((data) => <option key={data.purorder_id} >{data.purorder_id}</option>)}
                            </select>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-name-input" className="form-label">Product name</label>
                          <select id="formrow-supp" className="form-select" name="poc_p_id" onChange={this.handleChange}>
                                  <option selected>Choose...</option>
                                  <option>1</option>
                                  <option>2</option>
                          </select>
                          </div>
                      </div>
                      <div className="col-md-1">
                          <div className="mb-3">
                              <br></br>
                              <button className="btn btn-outline-secondary btn-sm my-2" title="Add">
                                <Link key="t-product-list" to="/product"> <i className="fa fa-plus" /></Link>
                              </button>
                          </div>
                      </div>
                  </div>

                      <div className="row">
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Buy Price</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="poc_buyingPrice" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-qty-input" className="form-label">Quantity</label>
                          <input type="decimal" className="form-control" id="formrow-qty-input" name="poc_qty" onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-total-input" className="form-label">Total value</label>
                            <input type="decimal" className="form-control" id="formrow-total-input" name="poc_totalValue" onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="formrow-status-input" className="form-label">Status</label>
                            <select id="formrow-status" className="form-select" name="poc_isActive" onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              <option>Pending</option>
                              <option>Partial</option>
                              <option>Ordered</option>
                              <option>Received</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="formrow-date-input" className="form-label">Date</label>
                            <input type="date" className="form-control" id="formrow-date-input" name="poc_addedDate" onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>
              
                      
                            {/* <div className="mb-3">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="gridCheck" />
                                <label className="form-check-label" htmlFor="gridCheck">
                                Check me out
                                </label>
                            </div>
                            </div> */}
                      <div>
                        <button type="submit" className="btn btn-primary w-md float-right">Submit</button>
                        <button type="submit" className="btn btn-primary w-md mx-3 float-right" data-bs-dismiss="modal">Close</button>
                      </div>
                  </form>
                  
                  </div>
              </div>
          
          </div>
      </div>
      </div>


            
{/* Update PO cart modal */}

<div id="myUpdateModal" className="modal fade" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog">
      <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title" id="myModalLabel">Update Purchase Order Cart</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
          <h6>*All the fields are required</h6>

          <div className="card mt-3">
                  
              <form onSubmit={this.handleUpdatePOcart}>
                  
                  <div className="row">
                    <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-poid-input" className="form-label">PO ID</label>
                            <select id="formrow-poid" className="form-select" name="poc_purorder_id" value={this.state.poc_purorder_id} onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              {this.state.orders.map((data) => <option key={data.purorder_id} >{data.purorder_id}</option>)}
                            </select>
                          </div>
                      </div>
                      <div className="col-md-6">
                          <div className="mb-3">
                          <label htmlFor="formrow-name-input" className="form-label">Product name</label>
                          <select id="formrow-supp" className="form-select" name="poc_p_id" value={this.state.poc_p_id}  onChange={this.handleChange}>
                                  <option selected>Choose...</option>
                                  <option>1</option>
                                  <option>2</option>
                          </select>
                          </div>
                      </div>
                      <div className="col-md-1">
                          <div className="mb-3">
                              <br></br>
                              <button className="btn btn-outline-secondary btn-sm my-2" title="Add">
                                <Link key="t-product-list" to="/product"> <i className="fa fa-plus" /></Link>
                              </button>
                          </div>
                      </div>
                  </div>

                      <div className="row">
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-price-input" className="form-label">Buy Price</label>
                          <input type="decimal" className="form-control" id="formrow-price-input" name="poc_buyingPrice" value={this.state.poc_buyingPrice}  onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                          <div className="mb-3">
                          <label htmlFor="formrow-qty-input" className="form-label">Quantity</label>
                          <input type="decimal" className="form-control" id="formrow-qty-input" name="poc_qty" value={this.state.poc_qty}  onChange={this.handleChange}/>
                          </div>
                      </div>
                      <div className="col-md-4">
                            <div className="mb-3">
                            <label htmlFor="formrow-total-input" className="form-label">Total value</label>
                            <input type="decimal" className="form-control" id="formrow-total-input" name="poc_totalValue" value={this.state.poc_totalValue}  onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="formrow-status-input" className="form-label">Status</label>
                            <select id="formrow-status" className="form-select" name="poc_isActive" value={this.state.poc_isActive}  onChange={this.handleChange}>
                              <option selected>Choose...</option>
                              <option>Pending</option>
                              <option>Partial</option>
                              <option>Ordered</option>
                              <option>Received</option>
                            </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="formrow-date-input" className="form-label">Date</label>
                            <input type="date" className="form-control" id="formrow-date-input" name="poc_addedDate" value={this.state.poc_addedDate}  onChange={this.handleChange}/>
                            </div>
                        </div>
                      </div>
              
                      <div>
                        <button type="submit" className="btn btn-primary w-md float-right">Update</button>
                        <button type="submit" className="btn btn-primary w-md mx-3 float-right" data-bs-dismiss="modal">Close</button>
                      </div>
                  </form>
                  
                  </div>
              </div>
          
          </div>
      </div>
      </div>
      </div>
      </div>
      

      </div>
    </body>
        )
    }
}

export default POCart